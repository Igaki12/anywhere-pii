import {
  Input,
  Flex,
  Text,
  Tooltip,
  InputLeftElement,
  InputGroup,
  Wrap,
  WrapItem,
  Spacer,
  Box,
  Button,
  Divider,
  Modal,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Badge,
  Highlight,
} from '@chakra-ui/react'
import { ArrowDownIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'

export const SearchWord = ({
  toast,
  questionList,
  technicalTerm,
  startSelectedLesson,
  appName,
}) => {
  const [renderSign, setRenderSign] = useState()
  const [inputValue, setInputValue] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => console.log(), [inputValue])
  const initialRef = useRef(null)
  return (
    <>
      {technicalTerm && technicalTerm.length > 0 ? (
        <Box
          minW={'sm'}
          maxW="sm"
          p="1"
          bgColor={'whiteAlpha.800'}
          pt="20px"
          pb={8}
        >
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
            頻出キーワード
            <ChevronDownIcon boxSize="1.5em" />
          </Box>
          <Wrap justify={'center'} pt="2" pb="2">
            {technicalTerm
              .reduce((prevTermBox, curTermBox) => {
                let newTag = {
                  term: curTermBox.term[0],
                  terms: curTermBox.term,
                  explanation: curTermBox.explanation,
                  isOpen: false,
                  count: questionList.reduce((prevGroup, group) => {
                    return (
                      prevGroup +
                      group.groupContents.reduce((prevQuestion, question) => {
                        return (
                          prevQuestion +
                          curTermBox.term.reduce((prevTerm, curTerm) => {
                            if (prevTerm > 0) {
                              return 1
                            } else {
                              if (
                                question.detailInfo &&
                                question.detailInfo.indexOf(curTerm) > -1
                              )
                                return 1
                              else if (
                                question.questionSentence &&
                                question.questionSentence.indexOf(curTerm) > -1
                              )
                                return 1
                              else if (
                                question.answer &&
                                question.answer.indexOf(curTerm) > -1
                              )
                                return 1
                              else if (
                                question.commentary &&
                                question.commentary.indexOf(curTerm) > -1
                              )
                                return 1
                              else if (
                                question.choices &&
                                question.choices.every(
                                  (choice) => choice.indexOf(curTerm) === -1,
                                ) === false
                              )
                                return 1
                              else {
                                return 0
                              }
                            }
                          }, 0)
                        )
                      }, 0)
                    )
                  }, 0),
                }
                let newTagArray = [...prevTermBox, newTag].sort(
                  (a, b) => b.count - a.count,
                )
                if (newTagArray.length > 30) {
                  return newTagArray.splice(0, 30)
                } else {
                  return newTagArray
                }
              }, [])
              .map((tag, tagIndex) => {
                return (
                  <WrapItem>
                    <Button
                      size={'md'}
                      key={tagIndex + 'searchTag2'}
                      borderRadius="full"
                      variant="outline"
                      colorScheme={'black'}
                      onClick={() => {
                        toast({
                          title: `${tag.terms.join(' / ')}`,
                          description: `${tag.explanation}`,
                          status: 'error',
                          variant: 'left-accent',
                          duration: 30000,
                          isClosable: true,
                          position: 'top-right',
                        })
                      }}
                    >
                      {tag.term}
                      {' ('}
                      {tag.count}
                      {')'}
                    </Button>
                  </WrapItem>
                )
              })}
            {technicalTerm && technicalTerm.length > 15 ? (
              <WrapItem p={2}>...</WrapItem>
            ) : (
              <></>
            )}
          </Wrap>
          <Divider mt={'50px'} />
          <Button
            borderRadius={'full'}
            variant="solid"
            mt="3"
            mr="5%"
            ml="5%"
            w="90%"
            colorScheme="blackAlpha"
            onClick={onOpen}
          >
            <SearchIcon boxSize={'1.2em'} mr="1" ml="1" />
            他の単語について検索
          </Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>検索</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <InputGroup
                  position={'fixed'}
                  bgColor="white"
                  w="xs"
                  zIndex={'1001'}
                  borderRadius="sm"
                >
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                  />
                  <Input
                    ref={initialRef}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder="keyword to search for..."
                    w="xs"
                    type={'text'}
                  />
                </InputGroup>

                <Box mt="50px">
                  {technicalTerm
                    .reduce((prevGroup, curGroup, groupIndex) => {
                      if (
                        inputValue &&
                        inputValue !== '' &&
                        inputValue.indexOf('+') === -1 &&
                        inputValue.indexOf('*') === -1 &&
                        (curGroup.term.find(
                          (term) =>
                            term.match(new RegExp(inputValue, 'i')) !== null,
                        ) ||
                          curGroup.explanation.match(
                            new RegExp(inputValue, 'i'),
                          ) !== null)
                      ) {
                        // console.log(inputValue, prevGroup);
                        if (prevGroup && prevGroup.length < 10) {
                          return [
                            ...prevGroup,
                            {
                              term: curGroup.term,
                              explanation: curGroup.explanation,
                              isOpen: false,
                              count: questionList.reduce((prevGroup, group) => {
                                return (
                                  prevGroup +
                                  group.groupContents.reduce(
                                    (prevQuestion, question) => {
                                      return (
                                        prevQuestion +
                                        curGroup.term.reduce(
                                          (prevTerm, curTerm) => {
                                            if (prevTerm > 0) {
                                              return 1
                                            } else {
                                              if (
                                                question.detailInfo &&
                                                question.detailInfo.indexOf(
                                                  curTerm,
                                                ) > -1
                                              )
                                                return 1
                                              else if (
                                                question.questionSentence &&
                                                question.questionSentence.indexOf(
                                                  curTerm,
                                                ) > -1
                                              )
                                                return 1
                                              else if (
                                                question.answer &&
                                                question.answer.indexOf(
                                                  curTerm,
                                                ) > -1
                                              )
                                                return 1
                                              else if (
                                                question.commentary &&
                                                question.commentary.indexOf(
                                                  curTerm,
                                                ) > -1
                                              )
                                                return 1
                                              else if (
                                                question.choices &&
                                                question.choices.every(
                                                  (choice) =>
                                                    choice.indexOf(curTerm) ===
                                                    -1,
                                                ) === false
                                              )
                                                return 1
                                              else {
                                                return 0
                                              }
                                            }
                                          },
                                          0,
                                        )
                                      )
                                    },
                                    0,
                                  )
                                )
                              }, 0),
                            },
                          ]
                        }
                      }
                      return prevGroup
                    }, [])
                    .sort((a, b) => b.count - a.count)
                    .map((termGroup, termIndex) => (
                      <Button
                        key={termIndex}
                        colorScheme="black"
                        variant="outline"
                        borderRadius="full"
                        m={'1'}
                        maxW="100%"
                        onClick={() => {
                          toast({
                            title: `${termGroup.term.join(' / ')}`,
                            description: `${termGroup.explanation}`,
                            status: 'error',
                            variant: 'left-accent',
                            duration: 30000,
                            isClosable: true,
                            position: 'top-right',
                          })
                        }}
                      >
                        {termGroup.term[0].length > 15
                          ? termGroup.term[0].slice(0, 15) + '...'
                          : termGroup.term[0]}
                      </Button>
                    ))}
                  {technicalTerm.reduce((prevTermBox, curTermBox, index) => {
                    if (
                      inputValue &&
                      inputValue !== '' &&
                      inputValue.indexOf('+') === -1 &&
                      inputValue.indexOf('*') === -1 &&
                      (curTermBox.term.find(
                        (term) =>
                          term.match(new RegExp(inputValue, 'i')) !== null,
                      ) ||
                        curTermBox.explanation.match(
                          new RegExp(inputValue, 'i'),
                        ) !== null)
                    ) {
                      return [...prevTermBox, curTermBox.term[0]]
                    }
                    return prevTermBox
                  }, []).length > 10
                    ? '　...'
                    : ''}
                  <Divider mt="50px" />
                  {questionList.map((group, groupIndex) => {
                    let resultList = group.groupContents.reduce(
                      (prevQuestion, curQuestion, questionIndex) => {
                        if (!inputValue) {
                          return []
                        }
                        if (
                          inputValue.indexOf('+') !== -1 ||
                          inputValue.indexOf('*') !== -1
                        ) {
                          return []
                        }
                        if (
                          curQuestion.detailInfo &&
                          curQuestion.detailInfo.match(
                            new RegExp(inputValue, 'i'),
                          ) !== null
                        ) {
                          return [...prevQuestion, curQuestion]
                        } else if (
                          curQuestion.questionSentence &&
                          curQuestion.questionSentence.match(
                            new RegExp(inputValue, 'i'),
                          ) !== null
                        ) {
                          return [...prevQuestion, curQuestion]
                        } else if (
                          curQuestion.answer &&
                          curQuestion.answer.match(
                            new RegExp(inputValue, 'i'),
                          ) !== null
                        ) {
                          return [...prevQuestion, curQuestion]
                        } else if (
                          curQuestion.commentary &&
                          curQuestion.commentary.match(
                            new RegExp(inputValue, 'i'),
                          ) !== null
                        ) {
                          return [...prevQuestion, curQuestion]
                        } else if (
                          curQuestion.choices &&
                          curQuestion.choices.find(
                            (choice) =>
                              choice.match(new RegExp(inputValue, 'i')) !==
                              null,
                          )
                        ) {
                          return [...prevQuestion, curQuestion]
                        }
                        return prevQuestion
                      },
                      [],
                    )
                    return (
                      <>
                        <Flex m={1} mt="3">
                          <Badge
                            key={groupIndex}
                            colorScheme="red"
                            size="sm"
                            variant="solid"
                            borderRadius="full"
                            pr="2"
                            pl="2"
                            mr="2"
                          >
                            {group.groupTag}
                          </Badge>
                          <Text fontSize={'xs'}> {resultList.length} Hits</Text>
                        </Flex>
                        {resultList.map((question, questionIndex) => {
                          if (questionIndex > 5) {
                            return <></>
                          }
                          if (questionIndex === 5) {
                            return <Text>...</Text>
                          }
                          return (
                            <Box bgColor="gray.100" fontSize="xs" mb="1" p={1}>
                              {/* <Highlight
                                query={initialRef}
                                styles={{ px: '1', py: '1', bg: 'blue.100' }}
                              > */}
                              {question.questionSentence}
                              {/* </Highlight> */}
                            </Box>
                          )
                        })}
                      </>
                    )
                  })}
                </Box>
              </ModalBody>

              <ModalFooter mt="10" mb="200px">
                <Button
                  colorScheme="orange"
                  mr={3}
                  onClick={() => {
                    console.log('onClick0:', inputValue)
                    if (!inputValue) return
                    let rangeIndex = -1
                    let selectedList = questionList.reduce(
                      (prevGroup, group, groupIndex) => {
                        if (
                          group.groupContents.reduce(
                            (prevQuestion, curQuestion, questionIndex) => {
                              if (!inputValue) {
                                return []
                              }
                              // console.log('prevQUestion:', prevQuestion);
                              if (
                                inputValue.indexOf('+') !== -1 ||
                                inputValue.indexOf('*') !== -1
                              ) {
                                return []
                              }
                              if (
                                curQuestion.detailInfo &&
                                curQuestion.detailInfo.match(
                                  new RegExp(inputValue, 'i'),
                                ) !== null
                              ) {
                                return [...prevQuestion, curQuestion]
                              } else if (
                                curQuestion.questionSentence &&
                                curQuestion.questionSentence.match(
                                  new RegExp(inputValue, 'i'),
                                ) !== null
                              ) {
                                return [...prevQuestion, curQuestion]
                              } else if (
                                curQuestion.answer &&
                                curQuestion.answer.match(
                                  new RegExp(inputValue, 'i'),
                                ) !== null
                              ) {
                                return [...prevQuestion, curQuestion]
                              } else if (
                                curQuestion.commentary &&
                                curQuestion.commentary.match(
                                  new RegExp(inputValue, 'i'),
                                ) !== null
                              ) {
                                return [...prevQuestion, curQuestion]
                              } else if (
                                curQuestion.choices &&
                                curQuestion.choices.find(
                                  (choice) =>
                                    choice.match(
                                      new RegExp(inputValue, 'i'),
                                    ) !== null,
                                )
                              ) {
                                return [...prevQuestion, curQuestion]
                              }
                              return prevQuestion
                            },
                            [],
                          ).length < 1
                        ) {
                          return prevGroup
                        }
                        rangeIndex++
                        return [
                          ...prevGroup,
                          {
                            groupTag: group.groupTag,
                            groupContentIds: group.groupContents.reduce(
                              (prevQuestion, curQuestion, questionIndex) => {
                                if (!inputValue) {
                                  return []
                                }
                                if (
                                  inputValue.indexOf('+') !== -1 ||
                                  inputValue.indexOf('*') !== -1
                                ) {
                                  return []
                                }
                                if (
                                  curQuestion.detailInfo &&
                                  curQuestion.detailInfo.match(
                                    new RegExp(inputValue, 'i'),
                                  ) !== null
                                ) {
                                  return [
                                    ...prevQuestion,
                                    ('000' + rangeIndex).slice(-3) +
                                      ('000' + questionIndex).slice(-3),
                                  ]
                                } else if (
                                  curQuestion.questionSentence &&
                                  curQuestion.questionSentence.match(
                                    new RegExp(inputValue, 'i'),
                                  ) !== null
                                ) {
                                  return [
                                    ...prevQuestion,
                                    ('000' + rangeIndex).slice(-3) +
                                      ('000' + questionIndex).slice(-3),
                                  ]
                                } else if (
                                  curQuestion.answer &&
                                  curQuestion.answer.match(
                                    new RegExp(inputValue, 'i'),
                                  ) !== null
                                ) {
                                  return [
                                    ...prevQuestion,
                                    ('000' + rangeIndex).slice(-3) +
                                      ('000' + questionIndex).slice(-3),
                                  ]
                                } else if (
                                  curQuestion.commentary &&
                                  curQuestion.commentary.match(
                                    new RegExp(inputValue, 'i'),
                                  ) !== null
                                ) {
                                  return [
                                    ...prevQuestion,
                                    ('000' + rangeIndex).slice(-3) +
                                      ('000' + questionIndex).slice(-3),
                                  ]
                                } else if (
                                  curQuestion.choices &&
                                  curQuestion.choices.find(
                                    (choice) =>
                                      choice.match(
                                        new RegExp(inputValue, 'i'),
                                      ) !== null,
                                  )
                                ) {
                                  return [
                                    ...prevQuestion,
                                    ('000' + rangeIndex).slice(-3) +
                                      ('000' + questionIndex).slice(-3),
                                  ]
                                }
                                return prevQuestion
                              },
                              [],
                            ),
                          },
                        ]
                      },
                      [],
                    )
                    if (selectedList.length < 1) return
                    startSelectedLesson(questionList, appName, {
                      startTime: '',
                      order: 'ascend',
                      range: selectedList.map((group) => {
                        return group.groupTag
                      }),
                      wordFilter: [inputValue],
                      asked: [],
                      asking: '',
                      remaining: selectedList.reduce(
                        (prevGroup, group, groupIndex) => {
                          return [...prevGroup, ...group.groupContentIds]
                        },
                        [],
                      ),
                      review: [],
                    })
                  }}
                >
                  <ArrowDownIcon fontSize="1.2em" mr="0.5" ml="-1" />
                  問題を解く
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}
