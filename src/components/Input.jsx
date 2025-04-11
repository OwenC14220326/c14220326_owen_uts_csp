import "../App.css";

function Input({ input, setInput, addTodo, error }) {
    return (
        <>
            <div className="input-area">
                <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Tambah todo..."
            />
            <button onClick={addTodo}>Tambah</button>
            </div>
            {error && <div className="error-msg">{error}</div>}
        </>
    );
}

export default Input;
