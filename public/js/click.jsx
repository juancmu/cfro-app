const Example = () => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
      document.title = `You clicked ${count} times`;
    });


    return (
      <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
      </>
    );
  };


  const root = ReactDOM.createRoot(document.getElementById("root"))
  root.render(<Example />);

  const root2 = ReactDOM.createRoot(document.getElementById("root2"))
  root2.render(<Example />);