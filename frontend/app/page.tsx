"use client";

import AddSection from "@/features/main/components/AddSection";
import Footer from "@/features/main/components/Footer";
import Header from "@/features/main/components/Header";
import LoadingNoteCard from "@/features/main/components/LoadingNoteCard";
import NoteCard from "@/features/main/components/NoteCard";
import SearchSection from "@/features/main/components/SearchSection";
import { NoteType } from "@/features/main/types/NoteType";
import { TagType } from "@/features/main/types/TagType";
import formatDate from "@/features/main/utils/formatDate";
import handleReadNotes from "@/features/main/utils/CRUD/handleReadNotes";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [tags, setTags] = useState<TagType>({});
  const [selectedTag, setSelectedTag] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "Dot-User",
    email: "email@example.com",
  });

  // Get User Data
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
          {
            withCredentials: true,
          }
        );
        if (res.data.loggedIn) setLoggedIn(true);
        setUserData({ name: res.data.username, email: res.data.email });
      } catch (err) {
        setLoggedIn(false); // 401 → مش مسجل دخول
      }
    };

    checkUser();
  }, []);

  // Get Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const currentNotes = await handleReadNotes();
        const data = currentNotes.data || [];
        setNotes(data);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // keep tags in sync with notes whenever notes change
  useEffect(() => {
    const getTags = notes
      .flatMap((n) => n.tags)
      .sort()
      .reduce((acc, tag) => {
        acc[tag!] = (acc[tag!] || 0) + 1;
        return acc;
      }, {} as TagType);

    setTags(getTags);
  }, [notes]);

  // handlers used by child components so UI updates without refresh
  const handleAddNote = (note: NoteType) => {
    // add new note at the top
    setNotes((prev) => [note, ...prev]);
  };

  const handleUpdateNoteInState = (updated: NoteType) => {
    if (!updated._id) return;
    setNotes((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
  };

  const handleDeleteNoteFromState = (id: string) => {
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notes.filter((note) => {
      // فلتر البحث
      const matchesSearch =
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query);

      // فلتر التاج
      const matchesTag = selectedTag ? note.tags!.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [search, notes, selectedTag]);

  return (
    <div className="dark:bg-gray-700">
      <Header userData={userData} loggedIn={loggedIn} />
      <AddSection
        loggedIn={loggedIn}
        notesCount={notes.length}
        onAdd={handleAddNote}
      />
      <SearchSection
        tags={tags}
        notesLength={notes.length}
        search={search}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        setSearch={setSearch}
      />

      <div className="py-8">
        {loading ? (
          <LoadingNoteCard />
        ) : filteredNotes.length ? (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 "
          >
            {filteredNotes.map((n) => (
              <NoteCard
                key={n._id}
                _id={n._id}
                title={n.title}
                content={n.content}
                tags={n.tags}
                createdAt={formatDate(n.createdAt!)}
                onUpdate={handleUpdateNoteInState}
                onDelete={handleDeleteNoteFromState}
              />
            ))}
          </motion.div>
        ) : search ? (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center w-full"
          >
            <Image
              src="/no search.svg"
              alt="no search"
              width={200}
              height={0}
            />
            <p className="mt-3 mb-1 text-xl font-semibold dark:text-white">
              No Result
            </p>
            <p className="text-sm text-gray-500 max-w-1/2 text-center line-clamp-2 dark:text-gray-400">
              No Note matched with your search "{search}"
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center w-full"
          >
            <Image src="/no notes.svg" alt="no notes" width={200} height={0} />
            <p className="mt-3 mb-1 text-xl font-semibold dark:text-white">
              No Notes yet
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add your first note
            </p>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
