import React, { useState } from "react"
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate"
import { Helmet } from "react-helmet"

export interface AdobeAnimateProps {

}

export const AdobeAnimate = (props: AdobeAnimateProps) => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter|null>(null);

    return <React.Fragment>
        <AnimateCC
            animationName="testnotification"
            getAnimationObject={getAnimationObject}
            paused={false}
         />
    </React.Fragment>
}