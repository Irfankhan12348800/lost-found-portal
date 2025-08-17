function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        🎒 Lost & Found Portal
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl">
        Easily report or search lost and found items in your campus, hostel, or community.  
        Make sure nothing gets permanently lost!
      </p>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbofcdxiOyAnW_aaVfJIJxxNob6gqZe2oGMQ&s"
        alt="Lost & Found"
        className="w-60 h-60 object-contain drop-shadow-lg"
      />
    </div>
  );
}

export default Home;
