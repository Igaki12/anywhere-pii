import {
  Stack,
  Button,
  Spacer,
  Circle,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Divider,
  Text,
  Tag,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Box,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { SettingsIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons'
export const ControlPanel = ({ log, isAnswered }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(false)
  const scrollToTheBottom = () => {
    let element = document.documentElement
    let bottom = element.scrollHeight - element.clientHeight
    window.scrollTo({
      top: bottom,
      behavior: 'smooth',
    })
  }
  let achievementRate = Math.floor(
    (100 * (log.asked.length + (isAnswered ? 1 : 0))) /
      (log.asked.length + log.remaining.length + 1),
  )
  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        align="center"
        position={'fixed'}
        top="5"
        right={'5'}
        alignItems={'end'}
      >
        {log.remaining.length > 0 || isAnswered === false ? (
          <Button
            // color={'gray.600'}
            borderColor={'white'}
            borderWidth="2px"
            variant="solid"
            borderRadius={'lg'}
            // bgColor={'white'}
            h="45px"
            w={'45px'}
            onClick={() => {
              onOpen()
              console.log(isOpen)
            }}
            colorScheme="blackAlpha"
            boxShadow="dark-lg"
          >
            <SettingsIcon w={'25px'} h="25px" color={'white'} />
          </Button>
        ) : (
          <Button
            color={'white'}
            opacity="0.9"
            borderColor={'white'}
            borderWidth="2px"
            variant="solid"
            borderRadius={'lg'}
            h="45px"
            w={'45px'}
            onClick={onOpen}
            // bgColor="red"
            background="linear-gradient(#e66465, green);"
            // colorScheme="blackAlpha"
            boxShadow="dark-lg"
          >
            <SettingsIcon w={'25px'} h="25px" color={'white'} />
          </Button>
        )}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>出題パターン:</Text>
            <Tag colorScheme="red" m={1}>
              {log.order}
            </Tag>
            <Text mt={2}>出題範囲:</Text>
            {log.range.map((year, index) => (
              <Tag colorScheme="red" m="1" key={index}>
                {year}
              </Tag>
            ))}
            <Text mt={2}>単語絞り込み:</Text>
            {log.wordFilter && log.wordFilter.length > 0 ? (
              log.wordFilter.map((word, index) => (
                <Tag colorScheme="red" m="1" key={index}>
                  {word}
                </Tag>
              ))
            ) : (
              <Text fontSize={'sm'} ml={4}>
                なし
              </Text>
            )}
            <Divider orientation="horizontal" mt={3} mb="1" />
            <Text mt={2}>現在の成績:</Text>
            <Flex ml={'4'} mt={0} mb="3" alignItems={'center'}>
              <CircularProgress
                color="red"
                trackColor="gray.200"
                value={achievementRate}
              >
                <CircularProgressLabel>
                  {achievementRate}%
                </CircularProgressLabel>
              </CircularProgress>
              <Box ml={2}>
                <Text fontWeight={'bold'} pl="2">
                  現在{log.asked.length + 1}問目 / 残り
                  {log.remaining.length}問
                </Text>
              </Box>
            </Flex>
            <Text mt={2}>見直しリスト：</Text>
            <Flex mt={0} ml="5">
              <IconButton
                colorScheme={'red'}
                opacity="0.7"
                variant="solid"
                aria-label="review this question"
                icon={<RepeatIcon boxSize={'1.5em'} className="App-logo" />}
              />
              <Center fontWeight={'bold'} fontSize={'1em'} pl={3}>
                × {log.review.length} 問
              </Center>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => document.location.reload(true)}
            >
              タイトルに戻る
            </Button>
            <Button colorScheme="orange" mr={3} ml="1" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Stack
        direction="column"
        spacing={4}
        align="center"
        position={'fixed'}
        bottom="5"
        right={'5'}
        alignItems={'end'}
      >
        <Button
          // colorScheme="red"
          bgColor={'red'}
          opacity="0.5"
          variant="solid"
          borderRadius={'full'}
          borderWidth="2px"
          borderColor="white"
          h="50px"
          w={'50px'}
          onClick={scrollToTheBottom}
          boxShadow="dark-lg"
        >
          <ChevronDownIcon w={'40px'} h="40px" color="white" />
        </Button>
      </Stack>
    </>
  )
}
