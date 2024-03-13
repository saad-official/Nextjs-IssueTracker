import { Skeleton } from "@/app/components";
import { Box } from '@radix-ui/themes';

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton width={"20rem"} />
    </Box>
  )
}

export default LoadingNewIssuePage