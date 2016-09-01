import {
  Directive, ComponentMetadata, Input, ReflectiveInjector,
  ViewContainerRef, Compiler, Component, OnChanges
} from '@angular/core';

@Directive({
  selector: '[dynamicOutlet]',
})
export class DynamicOutlet implements OnChanges {
  @Input('dynamicOutlet') private template: string;
  @Input('dynamicOutletSelector') private selector: string;
  @Input('dynamicOutletContext') private context: Object;

  private _component;

  constructor(private _vcRef: ViewContainerRef, private _compiler: Compiler) { }

  private _createDynamicComponent() {
    this.context = this.context || {};

    const metadata = new ComponentMetadata({
      selector: this.selector,
      template: this.template,
    });

    const cmpClass = class VirtualClass { };
    cmpClass.prototype = this.context;
    this._component = Component(metadata)(cmpClass);

    return this._component;
  }

  getComponent() {
    return this._component;
  }

  ngOnChanges() {
    if (!this.template) {
      return;
    }

    this._compiler.compileComponentAsync(this._createDynamicComponent())
      .then(factory => {
        const injector = ReflectiveInjector.fromResolvedProviders([], this._vcRef.parentInjector);
        this._vcRef.clear();
        this._vcRef.createComponent(factory, 0, injector);
      });
  }
}
