/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals document */

import ClassicTestEditor from '@ckeditor/ckeditor5-core/tests/_utils/classictesteditor';
import SuperscriptEditing from '../../src/superscript/superscriptediting';
import SuperscriptUI from '../../src/superscript/superscriptui';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

describe( 'SuperscriptUI', () => {
	let editor, superView;

	testUtils.createSinonSandbox();

	beforeEach( () => {
		const editorElement = document.createElement( 'div' );
		document.body.appendChild( editorElement );

		return ClassicTestEditor
			.create( editorElement, {
				plugins: [ Paragraph, SuperscriptEditing, SuperscriptUI ]
			} )
			.then( newEditor => {
				editor = newEditor;

				superView = editor.ui.componentFactory.create( 'superscript' );
			} );
	} );

	afterEach( () => {
		return editor.destroy();
	} );

	it( 'should register superscript feature component', () => {
		expect( superView ).to.be.instanceOf( ButtonView );
		expect( superView.isOn ).to.be.false;
		expect( superView.label ).to.equal( 'Superscript' );
		expect( superView.icon ).to.match( /<svg / );
	} );

	it( 'should execute superscript command on model execute event', () => {
		const executeSpy = testUtils.sinon.spy( editor, 'execute' );

		superView.fire( 'execute' );

		sinon.assert.calledOnce( executeSpy );
		sinon.assert.calledWithExactly( executeSpy, 'superscript' );
	} );

	it( 'should bind model to superscript command', () => {
		const command = editor.commands.get( 'superscript' );

		expect( superView.isOn ).to.be.false;
		expect( superView.isEnabled ).to.be.true;

		command.value = true;
		expect( superView.isOn ).to.be.true;

		command.isEnabled = false;
		expect( superView.isEnabled ).to.be.false;
	} );
} );
