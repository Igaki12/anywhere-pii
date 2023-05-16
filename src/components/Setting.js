import {
  CheckboxGroup,
  Checkbox,
  Stack,
  Radio,
  RadioGroup,
  Button,
  List,
  ListItem,
  ListIcon,
  Divider,
  Text,
  Alert,
  AlertIcon,
  useToast,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
  Flex,
  Spacer,
  Skeleton,
} from '@chakra-ui/react'
import {
  CheckCircleIcon,
  InfoIcon,
  QuestionIcon,
  WarningIcon,
} from '@chakra-ui/icons'
import '../App.css'
import { SearchWord } from './SearchWord'
import { useState } from 'react'
// import jsCookie from 'js-cookie'
import titleImg from '../img/titleImg.jpg'
export const Setting = ({
  toast,
  selected,
  setSelected,
  questionList,
  appName,
  loadLog,
  log,
  technicalTerm,
  toggleRange,
  toggleAllRange,
  changeOrder,
  startNewLesson,
  startLoadedLesson,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [renderSign, setRenderSign] = useState(0)
  const scrollToTop = () => {
    // let element = document.documentElement
    // let bottom = element.scrollHeight - element.clientHeight
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const howManyQuestions = () => {
    setSelected(
      questionList.reduce((prevGroup, curGroup, index) => {
        if (log.range && log.range.indexOf(curGroup.groupTag) !== -1) {
          return prevGroup + curGroup.groupContents.length
        }
        return prevGroup
      }, 0),
    )
  }
  return (
    <>
      <Box
        maxW="2xl"
        mr={'auto'}
        ml="auto"
        minH={'150px'}
        transitionDelay="3s"
        className="Headline1"
        mb={6}
      >
        <Flex pr={4}>
          <Spacer />
          <Button
            onClick={onOpen}
            colorScheme="blackAlpha"
            variant={'solid'}
            m={0}
            w={'40px'}
            h="40px"
            mt={4}
            mb={'-80px'}
          >
            <InfoIcon />
          </Button>
        </Flex>

        <Image
          src={titleImg}
          alt="TitleImage"
          m={0}
          p="1"
          mb={-14}
          borderRadius="lg"
          fallback={<Skeleton height={'100px'} />}
        />
        <Flex ml={4} mr="4">
          {selected !== 0 ? (
            <Button
              colorScheme="orange"
              variant="variant"
              borderWidth="2px"
              borderColor="white"
              isDisabled
            >
              はじめから
            </Button>
          ) : (
            <Button
              bgColor={'blackAlpha.600'}
              color={'white'}
              // borderRadius={'full'}
              borderWidth="2px"
              borderColor="whiteAlpha"
              variant="solid"
              onClick={() => {
                startNewLesson(questionList, appName)
                scrollToTop()
                howManyQuestions()
                // setTimeout(() => {
                //   saveLog(appName, log);
                // }, 500);
              }}
            >
              はじめから
            </Button>
          )}
          <Spacer />
          {loadLog(appName) &&
          loadLog(appName).logs &&
          loadLog(appName).logs[0] &&
          loadLog(appName).logs[0].remaining &&
          loadLog(appName).logs[0].remaining.length > 0 &&
          loadLog(appName).logs[0].startTime ? (
            <Button
              bgGradient="linear(to bottom right, pink.400, red.900)"
              color={'white'}
              variant="solid"
              // borderRadius={'full'}
              borderWidth="2px"
              borderColor="whiteAlpha"
              opacity={'0.9'}
              onClick={() => {
                startLoadedLesson(
                  questionList,
                  appName,
                  loadLog(appName).logs[0].startTime,
                )
                setTimeout(() => {
                  window.scrollTo({
                    bottom: 0,
                    behavior: 'smooth',
                  })
                }, 1000)
              }}
            >
              続きから(あと
              {loadLog(appName).logs[0].remaining.length +
                (loadLog(appName).logs[0].asking ? 1 : 0)}
              問)
            </Button>
          ) : (
            <Button
              bgGradient="linear(to bottom right, pink.400, red.900)"
              color={'white'}
              variant="solid"
              isDisabled
            >
              続きから再開
            </Button>
          )}
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={'red.50'}>
          <ModalHeader>TIPS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3} p={0} bgColor="ews.50" fontSize={'sm'}>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="gray.500" />
                スマートフォン・PC・タブレットでどこでも試験対策が可能！
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="gray.500" />
                出題パターンや出題範囲・キーワードを自由に設定して、自分好みの問題集を作ろう
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="gray.500" />
                途中でアプリを消してしまっても、続きから再開できるので安心
              </ListItem>
              <ListItem>
                <ListIcon as={WarningIcon} color="gray.500" />
                問題は一部機械作成されているので誤字があり、解答解説は間違っている可能性があります。
              </ListItem>
              <ListItem>
                <ListIcon as={QuestionIcon} color="gray.500" />
                その他説明不足・バグ等あれば本人まで。
              </ListItem>
            </List>
            <Divider orientation="horizontal" mt={3} mb="1" />
            <Text>アップデート履歴</Text>
            <Text fontSize={'sm'}>
              05-07_Ver2.3-Xperiaの狭い横幅にもできるだけ対応
            </Text>
            <Text fontSize={'sm'}>04-28_Ver2.2-色合い,デザインを若干修正</Text>
            <Text fontSize={'sm'}>2023-04-13_Ver2.1-デザインを赤系に一新</Text>
            <Text fontSize={'md'} fontWeight="bold" mb="2" mt={2}>
              11-27_Ver2.0-包括的アップデート...コード部分を作り直し、WebStorageとの接続を強化、軽量化、見直しシステムの変更、検索システムの変更など
            </Text>
            <Text fontSize={'sm'}>10-03_Ver1.5-頻出キーワード確認を追加</Text>
            <Text fontSize={'sm'}>10-02_Ver1.4-キーワード検索を便利に</Text>
            <Text fontSize={'sm'}>09-16_Ver1.3-ボタンを透明に</Text>
            <Text fontSize={'sm'}>
              09-08_Ver1.2-タブレット向けにデザイン調節
            </Text>
            <Text fontSize={'sm'}>09-07_Ver1.1-WebStorageを採用</Text>
            <Text fontSize={'sm'}>
              08-01_Ver1.0-デザインを改善.正式リリース
            </Text>
            <Text fontSize={'sm'}>07-10_Ver0.9-辞書機能を試験実装</Text>
            <Text fontSize={'sm'}>06-01_Ver0.8-重くなりすぎないように改善</Text>
            <Text fontSize={'sm'}>05-25_Ver0.7-”続きから再開”機能を仮実装</Text>
            <Text fontSize={'sm'}>
              05-22_Ver0.6-cookieで設定を引継げるように
            </Text>
            <Text fontSize={'sm'}>
              05-09_Ver0.4-”キーワード絞込み”機能を実装
            </Text>
            <Text fontSize={'sm'}>2022-05-05_Ver0.1-仮リリース</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box mr={'auto'} ml="auto" maxW={'sm'}>
        {/* {checkMsg === '条件を満たした質問が存在しません' ? (
          <Alert status="error" fontWeight={'semibold'} maxW="lg">
            <AlertIcon />
            {checkMsg}
          </Alert>
        ) : (
          <>
            {checkMsg ? (
              <Alert status="success" maxW={'lg'}>
                <AlertIcon />
                {checkMsg}
              </Alert>
            ) : (
              <></>
            )}
          </>
        )} */}

        <RadioGroup defaultValue={log.order}>
          <Stack spacing={5} direction="row" p={2}>
            <Radio
              size={'lg'}
              colorScheme="orange"
              value="random"
              onChange={() => {
                changeOrder('random')
              }}
            >
              ランダム出題
            </Radio>
            <Radio
              size={'lg'}
              colorScheme="orange"
              value="ascend"
              onChange={() => {
                changeOrder('ascend')
              }}
            >
              順番通り出題
            </Radio>
          </Stack>
        </RadioGroup>
        <CheckboxGroup
          colorScheme="green"
          //  defaultValue={log.range}
        >
          <Stack
            maxW={'sm'}
            spacing={[2, 2]}
            direction={['column']}
            bg="whiteAlpha.800"
            p={2}
            mb="5"
            mr={0}
            ml={0}
          >
            {questionList.map((group, index) => {
              return log.range.includes(group.groupTag) ? (
                <Checkbox
                  isChecked={true}
                  bgColor={'gray.100'}
                  colorScheme="orange"
                  size={'md'}
                  key={index}
                  p={2}
                  pl="4"
                  onChange={() => {
                    toggleRange(group.groupTag)
                    setRenderSign(renderSign + 1)
                  }}
                >
                  {group.groupTag}(
                  {group.groupContents ? group.groupContents.length : '0'}問)
                </Checkbox>
              ) : (
                <Checkbox
                  isChecked={false}
                  size={'md'}
                  key={index}
                  p={2}
                  pl="4"
                  onChange={() => {
                    toggleRange(group.groupTag)
                    setRenderSign(renderSign + 1)
                  }}
                >
                  {group.groupTag}(
                  {group.groupContents ? group.groupContents.length : '0'}問)
                </Checkbox>
              )
            })}

            {questionList &&
            log.range &&
            questionList.every((group) =>
              log.range.includes(group.groupTag),
            ) ? (
              <Button
                colorScheme="orange"
                isActive={true}
                onClick={() => {
                  toggleAllRange()
                  setRenderSign(renderSign + 1)
                }}
              >
                すべて選択解除
              </Button>
            ) : (
              <Button
                colorScheme="orange"
                onClick={() => {
                  toggleAllRange(questionList)
                  setRenderSign(renderSign + 1)
                }}
              >
                すべて選択
              </Button>
            )}
          </Stack>
        </CheckboxGroup>
      </Box>
    </>
  )
}
