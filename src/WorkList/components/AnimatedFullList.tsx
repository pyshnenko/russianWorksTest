import React from "react";
import AnimatedModal from "../../Animated/AnimatedModal";
import FullCard from "./FullCard";
import { ApiReqObjectType } from "../../types/api";

interface AnimatedFullListProps {
    setIsOpen: (value: number) => void,
    data: ApiReqObjectType | null,
}

export default function AnimatedFullList({
    data,
    setIsOpen,
}: AnimatedFullListProps): React.ReactNode {
    return (
        <AnimatedModal isVisible={data !== null}>
            {data !== null && <FullCard setOpenCardIndex={setIsOpen} cardData={data} />}
        </AnimatedModal>
    )
}