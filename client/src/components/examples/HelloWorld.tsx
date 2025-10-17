import HelloWorld from '../HelloWorld';

export default function HelloWorldExample() {
  return (
    <HelloWorld onReveal={() => console.log('Reveal triggered')} />
  );
}
