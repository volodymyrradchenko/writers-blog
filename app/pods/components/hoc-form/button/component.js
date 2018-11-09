import Component from '@ember/component';

let Button = Component.extend({
    tagName: 'input',
    classNames: ['hoc-form__button'],
    classNameBindings: ['buttonClass'],
    buttonClass: null,
    attributeBindings: ['type', 'value'],
});

export default Button.reopenClass({
    positionalParams: ['type', 'value']
})
