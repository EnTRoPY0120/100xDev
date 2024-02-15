***Example 1: tailwind syntax***
```js
function App() {
  return (
    <>
    <div className='grid grid-cols-10'>
      <div className='bg-red-500 col-span-4'>hi</div>
      <div className='bg-green-500 col-span-4'>hi</div>
      <div className='bg-yellow-500 col-span-2'>hi</div>
    </div>
    </>
  )
}
```

***Example 2:***
This is an example where the divs appear one below the other as tailwind is mobile first,
thus after reaching the breakpoint they appear one next to eachother.
```js
function App() {
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-3'>
     <div className='bg-red-500'>hi there</div> 
     <div className='bg-blue-500'>hi there</div> 
     <div className='bg-yellow-500' >hi there</div> 
    </div>
    </>
  )
}

```