const Ad = () => {
  return (
    <div className="block my-6 w-full ad">
      <ins
        className="block w-full text-center rounded-md border-2 border-bg-400 adsbygoogle"
        style={{ backgroundColor: "#110817" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4499854243209236"
        data-ad-slot="9846855571"
      ></ins>
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({})`}</script>
    </div>
  );
};

export default Ad;
