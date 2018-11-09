import Component from '@ember/component';

export default Component.extend({
  classNames: ['hoc-form__field-wrapper'],
  classNameBindings: ['fieldClass'],
  fieldClass: null,
});
