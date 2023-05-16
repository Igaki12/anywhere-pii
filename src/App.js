import './App.css'
import {
  Box,
  Heading,
  Badge,
  Flex,
  Text,
  useToast,
  Button,
  Divider,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Setting } from './components/Setting'
import { QuestionsLog } from './components/QuestionsLog'
import { ControlPanel } from './components/ControlPanel'
import { useQuestionList } from './useQuestionList'
import { useStorage } from './hooks/useStorage'
import { useTechnicalTerm } from './useTechnicalTerm'
import { useLog } from './hooks/useLog'
import { useState } from 'react'
import { SearchWord } from './components/SearchWord'
import { History } from './components/History.js'
import { Suggest } from './components/Suggest'

function App() {
  const toast = useToast()
  const [selected, setSelected] = useState(0)
  const { showQuestionList, appName, jpName } = useQuestionList()
  const questionList = showQuestionList()
  const { showTechnicalTerm } = useTechnicalTerm()
  const technicalTerm = showTechnicalTerm()
  const { loadLog } = useStorage()
  const [isAnswered, setIsAnswered] = useState(false)
  const {
    showLog,
    toggleRange,
    toggleAllRange,
    changeOrder,
    startNewLesson,
    toggleReview,
    nextQuestion,
    startLoadedLesson,
    reviewLoadedLesson,
    startSelectedLesson,
  } = useLog()
  const log = showLog()
  // const appName = 'anywhere-physiology1'
  return (
    <>
      <Heading mt={'3'} ml="3" color="red.900" mb={0}>
        どこでも試験対策
      </Heading>
      <Flex>
        <Badge
          m={1}
          mr="0"
          mt={'-0.5'}
          ml={3}
          borderRadius="full"
          px="2"
          colorScheme="red"
          variant={'outline'}
        >
          Ver.2.3
        </Badge>
        <Badge
          variant={'outline'}
          m={1}
          mt="-0.5"
          borderRadius="full"
          px="2"
          colorScheme="red"
        >
          {jpName}
        </Badge>
      </Flex>

      {log.startTime !== '' ? (
        <></>
      ) : (
        <Box mr="auto" ml={'auto'} justifyContent="center">
          <Setting
            maxW={'lg'}
            toast={toast}
            selected={selected}
            setSelected={setSelected}
            questionList={questionList}
            log={log}
            toggleRange={toggleRange}
            toggleAllRange={toggleAllRange}
            changeOrder={changeOrder}
            startNewLesson={startNewLesson}
            startLoadedLesson={startLoadedLesson}
            technicalTerm={technicalTerm}
            appName={appName}
            loadLog={loadLog}
          />
          <Wrap justify={'center'} mt="80px">
            {loadLog(appName) &&
            loadLog(appName).logs &&
            loadLog(appName).logs.filter((log) => {
              return (
                log.startTime && (log.review !== [] || log.remaining !== [])
              )
            }).length > 10 ? (
              <WrapItem w={'xs'}>
                <Suggest
                  loadLog={loadLog}
                  questionList={questionList}
                  appName={appName}
                  startSelectedLesson={startSelectedLesson}
                />
              </WrapItem>
            ) : (
              <></>
            )}
            <WrapItem w={'xs'}>
              <History
                loadLog={loadLog}
                questionList={questionList}
                appName={appName}
                startLoadedLesson={startLoadedLesson}
                reviewLoadedLesson={reviewLoadedLesson}
              />
            </WrapItem>
            <WrapItem minW={'sm'}>
              <SearchWord
                toast={toast}
                technicalTerm={technicalTerm}
                questionList={questionList}
                startSelectedLesson={startSelectedLesson}
                appName={appName}
              />
            </WrapItem>
          </Wrap>
          <Text
            fontSize="xs"
            textColor={'blackAlpha.700'}
            textAlign="center"
            mt={2}
            mb={0}
          >
            Pictures: Y.Kobayashi
          </Text>
          <Text
            fontSize="xs"
            textColor={'blackAlpha.700'}
            textAlign="center"
            mt={0}
            mb={2}
          >
            ©2022- IgaTatApps
          </Text>
        </Box>
      )}
      {log.startTime !== '' ? (
        <Box maxW="2xl" mr="auto" ml={'auto'}>
          <QuestionsLog
            isAnswered={isAnswered}
            setIsAnswered={setIsAnswered}
            toast={toast}
            questionList={questionList}
            log={log}
            loadLog={loadLog}
            nextQuestion={nextQuestion}
            toggleReview={toggleReview}
            technicalTerm={technicalTerm}
            appName={appName}
          />
          <Box h={'300px'} width="100px"></Box>
          <ControlPanel log={log} isAnswered={isAnswered} />
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}
//   )
// }

export default App
