/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  EuiTitle,
  EuiSpacer,
  EuiSmallButtonIcon,
  EuiSmallButtonEmpty,
  EuiAccordion,
  EuiPanel,
} from '@elastic/eui';
import './styles.scss';

const EnhancedAccordion = ({
  id,
  title,
  subTitle,
  isOpen,
  onToggle,
  children,
  isButton,
  iconType,
  extraAction,
}) => (
  <div className="euiPanel euiPanel--borderRadiusMedium euiPanel--plain euiPanel--hasShadow euiPanel--hasBorder euiPanel--flexGrowZero euiSplitPanel euiSplitPanel--row euiCheckableCard">
    <div className="euiPanel euiPanel--paddingMedium euiPanel--borderRadiusNone euiPanel--subdued euiPanel--noShadow euiPanel--noBorder euiPanel--flexGrowZero euiSplitPanel__inner">
      <EuiSmallButtonIcon
        color="text"
        onClick={onToggle}
        iconType="arrowRight"
        aria-label="Expand"
        className={`enhanced-accordion__arrow ${isOpen ? 'enhanced-accordion__arrow--open' : ''} ${
          isButton ? 'enhanced-accordion__arrow--hidden' : ''
        }`}
      />
    </div>
    <div className="enhanced-accordion__title-panel euiPanel euiPanel--borderRadiusNone euiPanel--transparent euiPanel--noShadow euiPanel--noBorder euiSplitPanel__inner">
      {!isButton && (
        <EuiAccordion
          id={id}
          arrowDisplay="none"
          extraAction={<div className="enhanced-accordion__extra">{extraAction}</div>}
          forceState={isOpen ? 'open' : 'closed'}
          onToggle={onToggle}
          buttonContent={
            <div className="enhanced-accordion__title">
              <EuiTitle
                size="s"
                onClick={onToggle}
                role="button"
                aria-pressed={isOpen ? 'true' : 'false'}
                aria-expanded={isOpen ? 'true' : 'false'}
              >
                <h3>{title}</h3>
              </EuiTitle>

              {subTitle && (
                <>
                  <EuiSpacer size="s" />
                  {subTitle}
                </>
              )}
            </div>
          }
        >
          <EuiPanel hasShadow={false} hasBorder={false}>
            {children}
          </EuiPanel>
        </EuiAccordion>
      )}
      {isButton && (
        <EuiSmallButtonEmpty
          onClick={onToggle}
          iconType={iconType}
          className="enhanced-accordion__button"
        >
          Add trigger
        </EuiSmallButtonEmpty>
      )}
    </div>
  </div>
);

export default EnhancedAccordion;
