interface User {
    id:string,
    name:string,
    age:number,
    email:string,
    password:string
}
// Pick 
type UpdateProps = Pick<User,'name'| 'email' |'password'>;

//Partial
type UpdatePropsOptional = Partial<UpdateProps>;

function updateUser(updateProps: UpdatePropsOptional){
// hit the database for the data
}

updateUser({
    name:"Vijay"
})


// readonly, use can either declare it in the interface or as a generic ReadOnly<> 

interface Config{
    readonly endpoint : string,
    readonly apiKey: string,
}

const config :Readonly<Config> = {
    endpoint :'https://api.example.com',
    apiKey: 'abcdef123456',
}
// config.apiKey = 'newkey'; // Error: Cannot assign to 'apiKey' because it is a read-only property.


// Record
interface Member {
  id: string;
  name: string;
}
  
type Users = Record<string, Member>;
  
const users: Users = {
  'abc123': { id: 'abc123', name: 'John Doe' },
  'xyz789': { id: 'xyz789', name: 'Jane Doe' },
};
  
console.log(users['abc123']); // Output: { id: 'abc123', name: 'John Doe' }


// Map
interface People {
  id: string;
  name: string;
}
  
// Initialize an empty Map
const usersMap = new Map<string, People>();
 
// Add users to the map using .set
usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
  
// Accessing a value using .get
console.log(usersMap.get('abc123')); // Output: { id: 'abc123', name: 'John Doe' }


type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEvent = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEvent) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); // OK


