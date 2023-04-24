import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Skeleton } from '@chakra-ui/skeleton'

export default function ChatLoading() {
    return (
        <Stack>
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
        </Stack>
    )
}
