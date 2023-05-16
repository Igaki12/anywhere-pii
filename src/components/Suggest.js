import { ChevronDownIcon, RepeatClockIcon, RepeatIcon } from '@chakra-ui/icons'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Text,
  Badge,
  Flex,
  Button,
  Spacer,
} from '@chakra-ui/react'

export const Suggest = ({
  loadLog,
  questionList,
  appName,
  startSelectedLesson,
}) => {
  const oldestStartTime = () => {
    let oldestDate = new Date()
    if (
      loadLog(appName).logs.length > 0 &&
      loadLog(appName).logs[loadLog(appName).logs.length - 1].startTime
    )
      oldestDate.setTime(
        parseInt(
          loadLog(appName).logs[loadLog(appName).logs.length - 1].startTime,
        ),
      )
    return oldestDate
  }
  const ninthStartTime = () => {
    let newestDate = new Date()
    if (loadLog(appName).logs.length > 9 && loadLog(appName).logs[9].startTime)
      newestDate.setTime(parseInt(loadLog(appName).logs[9].startTime))
    return newestDate
  }
  const reviewLog = (order) => {
    // console.log(order)
    return questionList.reduce(
      (prevGroup, group, groupIndex) => {
        console.log(prevGroup)
        if (
          loadLog(appName) &&
          loadLog(appName).logs &&
          loadLog(appName).logs.find(
            (log, logIndex) =>
              log.review &&
              log.range &&
              log.review.length > 0 &&
              log.range.length > 0 &&
              group.groupContents &&
              group.groupContents.length > 0 &&
              log.review.find(
                (id) =>
                  log.range[parseInt(id.slice(0, 3))] === group.groupTag &&
                  parseInt(id.slice(-3)) < group.groupContents.length,
              ),
          )
        ) {
          prevGroup.range.push(group.groupTag)
        }
        prevGroup.remaining = group.groupContents.reduce(
          (prevQuestion, question, questionIndex) => {
            if (
              loadLog(appName) &&
              loadLog(appName).logs &&
              loadLog(appName).logs.find(
                (log, logIndex) =>
                  log.review &&
                  log.range &&
                  log.review.length > 0 &&
                  log.range.length > 0 &&
                  log.review.find(
                    (id) =>
                      log.range[parseInt(id.slice(0, 3))] === group.groupTag &&
                      parseInt(id.slice(-3)) === questionIndex,
                  ),
              )
            ) {
              let newId =
                ('000' + prevGroup.range.indexOf(group.groupTag)).slice(-3) +
                ('000' + questionIndex).slice(-3)
              return [...prevQuestion, newId]
            }
            return prevQuestion
          },
          prevGroup.remaining,
        )
        return prevGroup
      },
      {
        startTime: '',
        order: order && order === 'random' ? 'random' : 'ascend',
        range: [],
        wordFilter: ['見直しリストより'],
        asked: [],
        asking: '',
        remaining: [],
        review: [],
      },
    )
  }
  return (
    <Box minH={'150px'} w="100%" p={1} pt="20px" bgColor="whiteAlpha.700">
      <Box
        w={'100%'}
        mr="auto"
        ml="auto"
        borderRadius="sm"
        bgColor="gray.600"
        color="white"
        fontSize="lg"
        fontWeight="bold"
        textAlign="center"
        mt="2"
        mb={2}
        pt="1"
      >
        おすすめリスト
        <ChevronDownIcon boxSize="1.5em" />
      </Box>
      {loadLog(appName).logs.filter((log) => {
        return log.startTime && log.review !== []
      }) ? (
        <Card
          variant="filled"
          borderRadius="md"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          color="white"
          mt="2"
        >
          <CardHeader p="0">
            <Center h="150px">
              <RepeatIcon boxSize="5em" color="white" />
            </Center>
          </CardHeader>
          <CardBody pt="0" textAlign="center">
            <Center fontWeight="bold">見直しリスト</Center>
            {questionList
              .reduce((prevGroup, curGroup, groupIndex) => {
                if (
                  loadLog(appName).logs.find((log, logIndex) => {
                    return (
                      log.range &&
                      log.review &&
                      log.review.find((id) => {
                        return (
                          log.range[parseInt(id.slice(0, 3))] ===
                            curGroup.groupTag &&
                          curGroup.groupContents.length > parseInt(id.slice(-3))
                        )
                      })
                    )
                  })
                ) {
                  // console.log(groupIndex)
                  return [
                    ...prevGroup,
                    {
                      tag: curGroup.groupTag,
                      count: curGroup.groupContents.reduce(
                        (prevQuestion, curQuestion, questionIndex) => {
                          if (
                            curQuestion &&
                            questionIndex &&
                            loadLog(appName).logs.find((log) => {
                              return (
                                log.review &&
                                log.review.find(
                                  (id) =>
                                    log.range[parseInt(id.slice(0, 3))] ===
                                      curGroup.groupTag &&
                                    parseInt(id.slice(-3)) === questionIndex,
                                )
                              )
                            })
                          ) {
                            // console.log(questionIndex)
                            return prevQuestion + 1
                          }
                          return prevQuestion
                        },
                        0,
                      ),
                    },
                  ]
                }
                return prevGroup
              }, [])
              .map((group, tagIndex) => {
                if (tagIndex > 10) {
                  return <></>
                }
                return (
                  <Badge colorScheme="blackAlpha" variant="solid" mr="1">
                    {group.tag}
                    {' ('}
                    {group.count}
                    {'問)'}
                  </Badge>
                )
              })}
          </CardBody>
          <CardFooter>
            <Flex w="100%">
              <Button
                colorScheme="whiteAlpha"
                variant="solid"
                size={'sm'}
                onClick={() => {
                  startSelectedLesson(
                    questionList,
                    appName,
                    reviewLog('random'),
                  )
                }}
              >
                ランダムに出題
              </Button>
              <Spacer />
              <Button
                colorScheme="whiteAlpha"
                variant="solid"
                size={'sm'}
                onClick={() => {
                  startSelectedLesson(
                    questionList,
                    appName,
                    reviewLog('ascend'),
                  )
                }}
              >
                順番通りに出題
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      ) : (
        <></>
      )}
      <Card
        variant="filled"
        borderRadius="md"
        bgGradient="linear(to-l, #00b09b, #96c93d)"
        color="white"
        mt="2"
      >
        <CardHeader p="0">
          <Center h="150px">
            <RepeatClockIcon boxSize="5em" color="white" />
          </Center>
        </CardHeader>
        <CardBody pt="0" textAlign="center">
          <Center fontWeight="bold">忘れてるかも？リスト</Center>
          <Text fontSize={'sm'}>
            {oldestStartTime().getMonth() + 1}/
            {('00' + oldestStartTime().getDate()).slice(-2)}
            {' ~ '}
            {ninthStartTime().getMonth() + 1}/
            {('00' + ninthStartTime().getDate()).slice(-2)}
            　の範囲で最近復習できていない問題:{}を厳選
          </Text>
        </CardBody>
        <CardFooter>
          <Flex w="100%">
            <Button colorScheme="whiteAlpha" variant="solid" size={'sm'}>
              ランダムに出題
            </Button>
            <Spacer />
            <Button colorScheme="whiteAlpha" variant="solid" size={'sm'}>
              順番通りに出題
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  )
}
