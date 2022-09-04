import { useCallback, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { changeInput, sendMessage } from "./chatSlice";
import { useNewWindow } from "./useNewWindow";
import store from "./store";
import "./App.css";

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const useChat = (id) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages[id]);
  const chatList = useSelector((state) => state.chat.chatList);
  const inputValue = useSelector((state) => state.chat.inputs[id]);

  const onInputChange = useCallback(
    (event) => {
      dispatch(changeInput({ value: event.target.value, id }));
    },
    [dispatch, id]
  );

  const onSendMessage = useCallback(
    (message) => {
      dispatch(sendMessage({ message: inputValue, id }));
    },
    [dispatch, id, inputValue]
  );

  return {
    messages,
    onInputChange,
    onSendMessage,
    chatList,
    inputValue,
  };
};

function App() {
  const [selectedId, setSelectedId] = useState("James");
  const { openNewWindow } = useNewWindow(<ChildWindowChat with={selectedId} />);

  return (
    <>
      <h1>Chat with {selectedId}</h1>

      <hr />
      <ChatList with={selectedId} setSelectedId={setSelectedId} />

      <hr />
      <MessageList with={selectedId} />
      <hr />

      <MessageInput with={selectedId} />
      <button onClick={openNewWindow}>Open new window</button>
    </>
  );
}

const ChatList = ({ with: id, setSelectedId }) => {
  const { chatList } = useChat(id);
  const onSelectChat = useCallback(
    (id) => () => setSelectedId(id),
    [setSelectedId]
  );

  return chatList.map((id) => (
    <button key={id} onClick={onSelectChat(id)}>
      {id}
    </button>
  ));
};

const MessageList = ({ with: id }) => {
  const { messages } = useChat(id);
  return messages?.map((message, index) => <div key={index}>{message}</div>);
};

const MessageInput = ({ with: id }) => {
  const { onInputChange, onSendMessage, inputValue } = useChat(id);

  return (
    <div>
      <input value={inputValue ?? ""} onChange={onInputChange} />
      <button onClick={onSendMessage}>Send</button>
    </div>
  );
};

const ChildWindowChat = ({ with: id }) => {
  return (
    <div>
      <h1>[Child Window] Chat with {id}</h1>
      <MessageList with={id} />
      <MessageInput with={id} />
    </div>
  );
};

export default AppWrapper;
