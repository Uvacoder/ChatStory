import tippy, { roundArrow } from 'tippy.js';
import 'tippy.js/animations/shift-toward-subtle.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/dist/svg-arrow.css';

export default function (el, options = {}) {
  const instance = tippy(el, {
    arrow: roundArrow,
    animation: 'shift-toward-subtle',
    theme: 'translucent',
    ...options,
  });

  return instance;
}
