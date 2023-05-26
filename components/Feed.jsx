"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { next: { tags: ["prompt"] } });
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (post) =>
        regex.test(post.prompt) ||
        regex.test(post.creator.username) ||
        regex.test(post.tag)
    );
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const searchResults = filterPrompts(e.target.value);
    setSearchedPosts(searchResults);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedPosts(searchResult);
  };

  return (
    <section className="feed">
      <form className="realtive w-full flex-center">
        <input
          type="text"
          value={searchText}
          placeholder="Search for a tag or a username"
          onChange={handleSearch}
          required
          className="search_input peer "
        />
      </form>
      {/* All Prompts */}
      {searchText ? (
        <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};
export default Feed;
