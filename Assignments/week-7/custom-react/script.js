// Step 1: Define the React-like element object
const reactElement = {
    type: 'a',
    props: {
        href: 'https://www.google.com',
        children : 'Click me to visit Google.com'
    }
}

// Step 2: Function to generate HTML code from React-like element
function createElement(element){
    if(typeof element == 'string'){
        return element;
    }

    const {type, props} = element;
    const children = props.children || [];
    const attributes = Object.keys(props)
    .filter(key => key !== 'children')
    .map(key => `${key} = ${props[key]}`)
    .join(' ')
    
    const childElements = Array.isArray(children) ? children.map(child => createElement(children).join('')) : children;
    return `<${type} ${attributes}>${childElements}<${type}>`
}

// Step 3: Function to render the React-like element to HTML
function customRender(element,target){
    const targetElement = document.querySelector(target);
    if(targetElement){
        targetElement.innerHTML = createElement(element);
    } else{
        console.error('Target element not found')
    }
} 

// Render the anchor tag to a div with id "root"
customRender(reactElement,'#root')