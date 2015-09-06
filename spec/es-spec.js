"use strict";
class Foo extends V3.GameObject{
	constructor(){
		var componentClasses = [V3.RenderComponent];
		super(componentClasses);
	}
	setUpRenderComponent(component){
		component.mesh = {foo: 'bar'};
	}
}

describe('Entity System', function(){
	describe('GameObject', function(){
		it('should create entity without components', function(){
			var entity = new V3.GameObject();
			expect(entity).toBeDefined();
		});
		it('Should create components on creation', function(){
			var foo = new V3.GameObject([V3.RenderComponent]);
			expect(foo.renderComponent).toBeDefined();
		});
		it('Should not allow creating multiple components of same type', function(){
			var foo = new V3.GameObject([V3.RenderComponent]);
			expect(function(){
				foo.addComponent(V3.RenderComponent)
			}).toThrow();
		});
		it('should trigger `component_new` event', function(){
			var onNewComponent = jasmine.createSpy('onNewComponent');
			document.addEventListener("component_new", onNewComponent);
			var foo = new V3.GameObject([V3.RenderComponent]);
			expect(onNewComponent).toHaveBeenCalled();
		});
		it('should run setups for component on creation', function(){
			var foo = new Foo();
			expect(foo.renderComponent.mesh).toEqual({foo:'bar'});
		});
		it('should remove components by type', function(){
			var foo = new V3.GameObject([V3.RenderComponent]);
			foo.addComponent(V3.InputComponent);
			foo.removeComponent('render');
			expect(foo.renderComponent).not.toBeDefined();
			expect(foo.inputComponent).toBeDefined();
			foo.removeComponent('input');
			expect(foo.inputComponent).not.toBeDefined();
		});
	});

	describe('Systems', function(){
		it('should remove components', function(){});
		it('should add components', function(){});
	});
});
