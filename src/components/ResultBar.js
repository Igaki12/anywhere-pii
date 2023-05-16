import {
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react'

export const ResultBar = ({ log, isAnswered }) => {
  let achievementRate = Math.floor(
    (100 * (log.asked.length + (isAnswered ? 1 : 0))) /
      (log.asked.length + log.remaining.length + 1),
  )
  return (
    <>
      <Flex ml={'4'} mt={3} mb="-2" alignItems={'center'}>
        <CircularProgress
          color="red"
          trackColor="white"
          value={achievementRate}
        >
          <CircularProgressLabel>{achievementRate}%</CircularProgressLabel>
        </CircularProgress>
        <Box ml={2}>
          <Text color={'gray'} pl="2">
            現在{log.asked.length + 1}問目 / 残り
            {log.remaining.length}問
          </Text>
        </Box>
      </Flex>
    </>
  )
}
