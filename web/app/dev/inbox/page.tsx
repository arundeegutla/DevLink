"use client";
/**
 * Shows all existing conversations. Allows you to click on conversation and send messages?
 */

// External Components
import Loading from "@components/common/Loading";
import GroupChatBlock from "@components/common/GroupChatBlock";
import ChatMessage from "@components/common/ChatMessage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Group } from "@/hooks/models";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// Icons
import { BsArrowUpRight, BsSendFill } from "react-icons/bs";

// Auth
import { useFBUser } from "@context/FBUserContext";
import { useDLUser } from "@context/DLUserContext";
import { useRouter } from "next/navigation";
import { useGetGroup } from "@/hooks/groups";

export default function Inbox() {
  const router = useRouter();
  const { fbuser } = useFBUser();
  const { user } = useDLUser();

  // Initialize Firestore
  const firestore = getFirestore();

  // Make a array of the users groups based on user.groups
  const [groups, setGroups] = useState(user.groups);
  const [selectedGroup, setSelectedGroup] = useState(groups[0] ?? null);
  const [inputValue, setInputValue] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const currValue = inputValue;
      setInputValue("");
      await addDoc(
        collection(firestore, "Groups", selectedGroup?.id, "messages"),
        {
          id: fbuser.uid,
          content: currValue,
          created: serverTimestamp(),
        }
      );
    }
  };

  const handleSelectGroup = (groupId: string) => {
    const newGroup = groups.find((group) => group.id === groupId);
    if (newGroup !== undefined)
      setSelectedGroup(newGroup);
      setMessages([]);
  };

  const {data: groupData, isLoading, isError} = useGetGroup(fbuser, selectedGroup?.id) as {data: Group, isLoading: boolean, isError: boolean};  // Make an array of all the messages in a group based on the group's messages subcollection and sort by timestamp
  const [messages, setMessages] = useState<
    { messageKey: string; id: string; content: string }[]
  >([]);
  useEffect(() => {
    setLoadingMessages(true);
    console.log("rendered");

    const q = query(
      collection(
        doc(collection(firestore, "Groups"), selectedGroup?.id),
        "messages"
      ),
      orderBy("created", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          messageKey: doc.id,
          id: doc.data().id as string,
          content: doc.data().content as string,
        }))
      );
      setLoadingMessages(false);
    });
    return unsubscribe;
  }, [selectedGroup]);

  console.log(groups);

  console.log(messages);

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-full h-full flex flex-row items-center justify-center p-4">
      <div className="w-1/4 h-full flex flex-col items-center bg-[#252525] p-2 border-[#747474] border-e-2 rounded-l-3xl">
        <h1 className="text-xl font-semibold">Inbox</h1>
        <hr className="my-1 border-t-2 w-full border-[#3b3b3b]" />
        {/* TODO: Add timestamp for messages ? (idk if this is possible with firebase msging) */}
        <div className="flex flex-col w-full overflow-y-scroll">
          {groups.map((group) => {
            return (
              <GroupChatBlock
                key={group.id}
                groupId={group.id}
                groupColor={group.color}
                groupName={group.name}
                isSelected={group.id === selectedGroup?.id}
                changeGroup={handleSelectGroup}
              />
            );
          })}
        </div>
      </div>
      {/* TODO: componentize this so it can be swapped out based on which group is being viewed */}
      <div className="w-3/4 h-full flex flex-col bg-[#252525] mr-4 overflow-hidden rounded-r-3xl">
        {/* Chat heading container */}
        <div className="w-full h-20 flex items-center justify-between bg-[#1f1f1f] px-2">
          {/* Image + chat name */}
          <div className="flex items-center">
            <Image
              width={0}
              height={0}
              src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781647228231/minecraft-steve-block-stationery-set-9781647228231_hr.jpg"
              className="w-12 h-12 rounded-full ml-2 mr-4"
              alt="Group Chat Image"
            />
            <h1 className="text-xl font-semibold mr-2">{selectedGroup.name}</h1>
          </div>
          {/* Link to project page */}
          <div className="transition-all duration-300 ease-in-out rounded-full p-2 mr-2 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]">
            <BsArrowUpRight className="text-xl" />
          </div>
        </div>
        {/* Chat body container - contains all the messages in the chat */}
        <div className="w-full h-full flex flex-col-reverse overflow-y-scroll px-4 py-2">
          {messages.map((message) => {
            const messageUser = groupData.members.find(
              (member) => member.id === message.id
            );
            return (
              <ChatMessage
                key={message.messageKey}
                messageContent={message.content}
                isOwnMessage={message.id === fbuser?.uid}
                user={messageUser ? messageUser : null}
              />
            );
          })}
        </div>
        {/* Chat messenger container - contains the text bar where users can send messages */}
        {loadingMessages ? <Loading /> :
        <div className="w-full h-20 flex items-center bg-[#1f1f1f] border-[#747474] border-t-2 p-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full h-full bg-[#252525] text-stone-200 outline-none rounded-xl mr-2 p-2 break-words"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
                e.preventDefault(); // Prevents the addition of a new line in the input on Enter
              }
            }}
          ></input>
          <div
            className="transition-all duration-300 ease-in-out rounded-full p-3 bg-[#c1c1c12a] text-[#C1C1C1] hover:bg-[#c1c1c1dd] hover:text-[#000000c7]"
            onClick={handleSendMessage}
          >
            <BsSendFill className="text-xl" />
          </div>
        </div>}
      </div>
    </div>
  );
}
