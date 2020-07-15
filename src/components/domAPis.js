import React from 'react'

export default () => 
			<>
				<h1>Dom APIS explained from Mozilla Docs</h1>
				<h2>WINDOW</h2>
				<p>window.scrollX = returns or set the number of pixels that the document is currently scrolled horizontally.</p>
				<p>window.pageXOffset  = returns or set the number of pixels that the document is currently scrolled horizontally.</p>
				<p>window.scrollY = returns or set the number of pixels that the document is currently scrolled vertically. </p>
				<p>window.pageYOffset = returns or set the number of pixels that the document is currently scrolled vertically. </p>
				<p>window.scroll(x,y) = sets the scroll position, without the parenthesis gets the x and y scroll coordinates.</p>
				<p>For cross-browser compatibility, use pageXOffset and pageYOffset.</p>

				<h2>ELEMENT</h2>
				<p>element.clientHeight = read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels, its the height of an element but you need to set it with CSS or inline.</p>
				<p>element.clientWidth = read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner width of an element in pixels, its the width of an element but you need to set it with CSS or inline.</p>
				<p>element.scrollTop = read-only return the number of pixels that an element's content is scrolled vertically.Same thing as window scrollY but for the inside of a element that has a overflow scroll for example.</p>
				<p>element.scrollHeight =  value is equal to the minimum height the element would require in order to fit all the content in the viewport without using a vertical scrollbar. Basically the same as clientHeight, dont know the difference.</p>
			</>