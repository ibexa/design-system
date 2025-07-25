import React, { useContext, useEffect, useRef, useState } from 'react';

import Expander from '../Expander';
import { TranslatorContext } from '@ids-context/Translator';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { AccordionProps } from './Accordion.types';

const FAKE_TIMEOUT_RERENDER = 1;

const Accordion = ({ children, header, initiallyExpanded = false, onHandleExpand = () => null }: AccordionProps) => {
    const Translator = useContext(TranslatorContext);
    const accordionContentRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(initiallyExpanded);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const collapseLabel = Translator.trans(/*@Desc("Hide")*/ 'ibexa.expander.label.collapse');
    const expandLabel = Translator.trans(/*@Desc("Show")*/ 'ibexa.expander.label.expand');
    const changeExpanded = (nextIsExpanded: boolean): void => {
        setIsExpanded(nextIsExpanded);
        onHandleExpand(nextIsExpanded);
        setIsAnimating(true);

        if (accordionContentRef.current) {
            const initialHeight = nextIsExpanded ? 0 : accordionContentRef.current.offsetHeight;

            accordionContentRef.current.style.height = `${initialHeight.toString()}px`;

            accordionContentRef.current.addEventListener(
                'transitionend',
                () => {
                    setIsAnimating(false);

                    if (accordionContentRef.current) {
                        accordionContentRef.current.style.removeProperty('height');
                    }
                },
                { once: true },
            );
        }

        setTimeout(() => {
            if (accordionContentRef.current) {
                const finalHeight = nextIsExpanded ? accordionContentRef.current.scrollHeight : 0;

                accordionContentRef.current.style.height = `${finalHeight.toString()}px`;
            }
        }, FAKE_TIMEOUT_RERENDER);
    };
    const mainClassName = createCssClassNames({
        'ids-accordion': true,
        'ids-accordion--is-animating': isAnimating,
        'ids-accordion--is-expanded': isExpanded,
    });

    useEffect(() => {
        setIsExpanded(initiallyExpanded);
    }, [initiallyExpanded]);

    return (
        <div className={mainClassName}>
            <div className="ids-accordion__header">
                <div className="ids-accordion__header-content">{header}</div>
                <Expander
                    collapseLabel={collapseLabel}
                    expandLabel={expandLabel}
                    hasIcon={true}
                    isExpanded={isExpanded}
                    onClick={changeExpanded}
                    type="caret"
                />
            </div>
            <div className="ids-accordion__content" ref={accordionContentRef}>
                {isExpanded || isAnimating ? children : null}
            </div>
        </div>
    );
};

export default Accordion;
