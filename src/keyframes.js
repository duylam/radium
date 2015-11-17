/* @flow */

import cssRuleSetToString from './css-rule-set-to-string';

let animationIndex = 1;

export default function keyframes(
  keyframeRules: {[percentage: string]: {[key: string]: string|number}},
  name?: string,
): {
  __radiumKeyframes: bool,
  name: string,
  getCSS(userAgent: string): string
} {
  const animationName = (name ? name + '-' : '') + 'Animation' + animationIndex;
  animationIndex += 1;

  return {
    __radiumKeyframes: true,
    name: animationName,
    getCSS(userAgent: string) {
      const keyframesPrefixed = '-webkit-keyframes';
      return '@' + keyframesPrefixed + ' ' + animationName + ' {\n' +
        Object.keys(keyframeRules).map(percentage =>
          cssRuleSetToString(
            percentage,
            keyframeRules[percentage],
            userAgent
          )
        ).join('\n') +
        '\n}\n';
    }
  };
}
