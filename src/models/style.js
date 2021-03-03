import { Model } from '@vuex-orm/core';
import { nanoid } from 'nanoid';

class Style extends Model {
  static entity = 'styles';

  static primaryKey = 'id';

  static fields() {
    return {
      id: this.uid(() => nanoid()),
      storyId: this.attr(null),
      general: this.attr({}),
    };
  }
}

export default Style;