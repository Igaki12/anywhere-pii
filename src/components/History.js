import {
  ArrowDownIcon,
  CalendarIcon,
  ChevronDownIcon,
  RepeatClockIcon,
  RepeatIcon,
} from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Collapse,
  Flex,
  Progress,
  Spacer,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

export const History = ({
  loadLog,
  questionList,
  appName,
  startLoadedLesson,
  reviewLoadedLesson,
}) => {
  const [show, setShow] = useState(
    // loadLog(appName)
    //   .logs.filter(log => {
    //     return log.startTime && (log.review !== [] || log.remaining !== []);
    //   })
    //   .splice(0, 10)
    //   .map(value => false)
    Array(30).fill(false),
  )
  const [renderSign, setRenderSign] = useState(0)
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
        履歴
        <ChevronDownIcon boxSize="1.5em" />
      </Box>
      {loadLog(appName) &&
      loadLog(appName).logs &&
      loadLog(appName).logs.filter((log, logIndex) => {
        return log.startTime && (log.review !== [] || log.remaining !== [])
      }) ? (
        <Stack spacing="2" bgColor={'none'}>
          {loadLog(appName)
            .logs.filter((log, logIndex) => {
              return (
                log.startTime && (log.review !== [] || log.remaining !== [])
              )
            })
            .splice(0, 10)
            .map((log, logIndex) => {
              let date = new Date()
              date.setTime(log.startTime)
              let prevDate = new Date()
              if (logIndex > 0) {
                prevDate.setTime(
                  loadLog(appName).logs.filter((log, logIndex) => {
                    return (
                      log.startTime &&
                      (log.review !== [] || log.remaining !== [])
                    )
                  })[logIndex - 1].startTime,
                )
                // console.log(prevDate);
              }
              return (
                <Box key={logIndex}>
                  {prevDate.getMonth() === date.getMonth() &&
                  prevDate.getDate() === date.getDate() &&
                  logIndex !== 0 ? (
                    <></>
                  ) : (
                    <Flex m={1} justifyContent="center">
                      <Badge
                        colorScheme={'orange'}
                        variant="solid"
                        borderRadius={'full'}
                        pr="2"
                        pl="2"
                      >
                        {date.getMonth() +
                          1 +
                          '/' +
                          ('00' + date.getDate()).slice(-2)}
                      </Badge>
                      <Text fontSize={'xs'} mr={2} ml="2">
                        計
                        {loadLog(appName)
                          .logs.filter((log, index) => {
                            return log.startTime
                          })
                          .reduce((prevLog, curLog, index) => {
                            let curDate = new Date()
                            curDate.setTime(curLog.startTime)
                            // console.log(curLog.asked.length)
                            if (
                              curDate.getMonth() === date.getMonth() &&
                              curDate.getDate() === date.getDate()
                            ) {
                              return (
                                prevLog +
                                curLog.asked.length +
                                (curLog.asking ? 1 : 0)
                              )
                            }
                            return prevLog
                          }, 0)}
                        問
                      </Text>
                      <Center>
                        {' '}
                        <Progress
                          lineHeight="100%"
                          w="100px"
                          value={
                            100 *
                            (loadLog(appName)
                              .logs.filter((log, index) => {
                                return log.startTime
                              })
                              .reduce((prevLog, curLog, index) => {
                                let curDate = new Date()
                                curDate.setTime(curLog.startTime)
                                // console.log(curLog.asked.length)
                                if (
                                  curDate.getMonth() === date.getMonth() &&
                                  curDate.getDate() === date.getDate()
                                ) {
                                  return (
                                    prevLog +
                                    curLog.asked.length +
                                    (curLog.asking ? 1 : 0)
                                  )
                                }
                                return prevLog
                              }, 0) /
                              loadLog(appName)
                                .logs.filter((log, index) => {
                                  return log.startTime
                                })
                                .reduce((prevLog, curLog, index) => {
                                  let curDate = new Date()
                                  curDate.setTime(curLog.startTime)
                                  // console.log(curLog.asked.length)

                                  return prevLog + curLog.asked.length
                                }, 0))
                          }
                          size="xs"
                          colorScheme="orange"
                          // hasStripe
                        />
                      </Center>
                    </Flex>
                  )}

                  <Card variant="filled" bgColor={'blackAlpha.100'}>
                    <CardHeader>
                      {('00' + date.getHours()).slice(-2)}:
                      {('00' + date.getMinutes()).slice(-2)} ~　
                      <RepeatClockIcon ml={'auto'} mr="1" boxSize={'1.2em'} />
                      {loadLog(appName)
                        .logs.filter((log, index) => {
                          return log.startTime && (log.review || log.remaining)
                        })
                        .reduce((prevLog, curLog, index) => {
                          if (index === logIndex) {
                            return (
                              prevLog +
                              curLog.remaining.length +
                              curLog.asked.length +
                              (curLog.asking ? 1 : 0)
                            )
                          }
                          return prevLog
                        }, 0)}
                      問選択
                    </CardHeader>
                    <CardBody pr="2" pl="2" pt="0" pb="0">
                      <Collapse startingHeight={35} in={show[logIndex]}>
                        {log.range.map((tag, tagIndex) => {
                          return (
                            <Badge
                              colorScheme="blackAlpha"
                              variant="solid"
                              mr="1"
                            >
                              {tag}
                            </Badge>
                          )
                        })}
                      </Collapse>
                      {log.range.join().length > 30 ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            let newShow = show
                            newShow[logIndex] = !show[logIndex]
                            console.log(newShow)
                            setShow(newShow)
                            setRenderSign(renderSign + 1)
                          }}
                          mt="0.25rem"
                          variant={'ghost'}
                        >
                          Show {show[logIndex] ? 'Less' : 'More'}
                        </Button>
                      ) : (
                        <></>
                      )}
                    </CardBody>
                    <CardFooter p={3}>
                      {log.review && log.review.length > 0 ? (
                        <Button
                          colorScheme={'red'}
                          variant="solid"
                          size="sm"
                          onClick={() => {
                            reviewLoadedLesson(
                              questionList,
                              appName,
                              log.startTime,
                            )
                            setRenderSign(renderSign + 1)
                          }}
                        >
                          <RepeatIcon boxSize="1.2em" ml="-1" mr="0.5" />
                          {'見直し '}
                          {
                            loadLog(appName).logs.filter((log, logIndex) => {
                              return (
                                log.startTime && (log.review || log.remaining)
                              )
                            })[logIndex].review.length
                          }
                          問
                        </Button>
                      ) : (
                        <></>
                      )}
                      <Spacer />
                      {log.remaining && log.remaining.length > 0 ? (
                        <Button
                          colorScheme={'red'}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            startLoadedLesson(
                              questionList,
                              appName,
                              log.startTime,
                            )
                          }}
                        >
                          <ArrowDownIcon boxSize={'1.2em'} mr="0.5" ml="-1" />
                          {'残り '}
                          {log.remaining.length}問
                        </Button>
                      ) : (
                        <Button
                          isDisabled
                          colorScheme={'orange'}
                          variant="outline"
                          size="sm"
                        >
                          完了
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </Box>
              )
            })}
        </Stack>
      ) : (
        <Text fontColor={'black'}>履歴なし</Text>
      )}
    </Box>
  )
}
