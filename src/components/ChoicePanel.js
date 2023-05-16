import { GridItem, Grid, Button } from '@chakra-ui/react'

export const ChoicePanel = ({}) => {
  return (
    <Grid
      maxW={'sm'}
      borderRadius="md"
      templateColumns="repeat(4, 1fr)"
      columnGap="6"
      rowGap={4}
      p="3"
      bg={'blackAlpha.100'}
    >
      <GridItem w="100%" h="10">
        <Button colorScheme="blue" w={'100%'}>
          1
        </Button>
      </GridItem>
      <GridItem w="100%" h="10">
        <Button colorScheme="red" w={'100%'}>
          2
        </Button>
      </GridItem>
      <GridItem w="100%" h="10">
        <Button colorScheme="green" w={'100%'}>
          3
        </Button>
      </GridItem>
      <GridItem w="100%" h="10">
        <Button colorScheme="yellow" w={'100%'}>
          4
        </Button>
      </GridItem>
      <GridItem w="100%" h="10">
        <Button colorScheme="purple" w={'100%'}>
          5
        </Button>
      </GridItem>
      <GridItem w="100%" h="10">
        <Button colorScheme="pink" w={'100%'}>
          6
        </Button>
      </GridItem>
    </Grid>
  )
}
