import { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line
import PDFWorker from 'worker-loader!pdfjs-dist/lib/pdf.worker';
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
  setPdfWorker
} from 'react-pdf-highlighter';

import Tip from '../../Tip';
import Sidebar from '../Sidebar';
import Spinner from '../../Spinner';

import { Card, Pagination } from 'antd';

setPdfWorker(PDFWorker);

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div style={{backgroundColor: '#fff', border: '1px solid #000', borderRadius: '3px'}}>
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const initialUrl = 'http://localhost:3333/pdf';

const DocumentHighlighter = ({ questionary }) => {
  const [url, setUrl] = useState(initialUrl);
  const [currentQuestion, setCurrentQuestion] = useState(questionary.items[0]);
  const [currentQuestionCardTitle, setCurrentQuestionCardTitle] = useState(`1. ${questionary.items[0]}`);
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [highlights, setHighlights] = useState([]);

  const scrollViewerTo = (highlight) => {}

  const getHighlightById = useCallback((id) => {
    return highlights.find(highlight => highlight.id === id);
  }, [highlights]);

  async function addHighlight(highlight) {
    console.log("Saving highlight", highlight);

    setHighlights([{ ...highlight, id: getNextId() }, ...highlights]);

    const updatedQuestion = {
      ...currentQuestion,
      answer: highlight
    };

    const currentQuestionIndex = questionary.items.findIndex(question => {
      return question.content === currentQuestion.content;
    });

    questionary.items[currentQuestionIndex] = updatedQuestion;
  }

  function updateHighlight(highlightId, position, content) {
    console.log("Updating highlight", highlightId, position, content);

    setHighlights(highlights.map(h => {
      const {
        id,
        position: originalPosition,
        content: originalContent,
        ...rest
      } = h;
      return id === highlightId
        ? {
          id,
          position: { ...originalPosition, ...position },
          content: { ...originalContent, ...content },
          ...rest
        }
        : h;
    }));
  }

  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());

    if (highlight) {
      scrollViewerTo(highlight);
    }
  }, [getHighlightById]);

  const handleCurrentQuestion = useCallback((page) => {
    setCurrentQuestion(questionary.items[page - 1]);
    setCurrentQuestionCardTitle(`${page}. ${currentQuestion.content}`);
  }, [questionary.items, currentQuestion]);

  useEffect(() => {
    window.addEventListener(
      "hashchange",
      scrollToHighlightFromHash,
      false
    );
  }, [scrollToHighlightFromHash]);

  const pagination = (
    <Pagination
      simple
      defaultCurrent={1}
      pageSize={1}
      onChange={handleCurrentQuestion}
      total={questionary.items.length}
    />
  );

  return (
    <div style={{ display: "flex" }}>

        <Card
        title='1. Selecione título ou item de contexto no doc'
        headStyle={{backgroundColor: '#1890FF'}}
        bodyStyle={{padding: 0, height: '73vh', width: '33.5vw'}}
        extra={pagination}
        style={{height: '73vh'}}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {pdfDocument => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                // pdfScaleValue="page-width"
                scrollRef={scrollTo => {
                  scrollViewerTo = scrollTo;

                  scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={comment => {
                      addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={boundingRect => {
                        updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                          );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </Card>
        <Sidebar
          questionary={questionary}
          currentQuestion={currentQuestion}
          currentAnswer={currentAnswer}
          highlights={highlights}
        />
      </div>
  );
}

export default DocumentHighlighter;
