{/* --- replace the "春の駆け馬" Link block with a non-clickable placeholder --- */}
            <Link href="/event/ver5-8/NovaGallop" className="block">
              <div
                className="
                  relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                  transition-all duration-200
                  hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-pink-400
                  cursor-pointer
                "
                style={{
                  backgroundImage: "url('/ver_event/New_Event_TOP.PNG')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top"
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-200" />
                <div className="relative z-10 p-4">
                  <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                    春の駆け馬
                  </h3>
                  <p className="text-sm sm:text-base text-white drop-shadow">
                    イベントミニゲームの詳細をチェック！
                  </p>
                </div>
              </div>
            </Link>

{/* --- replace the "Ver6.0テストサーバー" Link block with a non-clickable placeholder --- */}
            <Link href="/event/ver5-8/ver6-0_testserver" className="block">
             <div
               className="
                 relative rounded shadow h-40 flex flex-col justify-end overflow-hidden group
                 transition-all duration-200
                 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-sky-400
                 cursor-pointer
               "
               style={{
                 backgroundImage: "url('/ver_event/New_Event_6.PNG')",
                 backgroundSize: "cover",
                 backgroundPosition: "center top"
               }}
             >
               <div className="absolute inset-0 bg-blue-900/30 group-hover:bg-blue-900/40 transition-all duration-200" />
               <div className="relative z-10 p-4">
                 <h3 className="font-semibold text-base sm:text-lg text-white drop-shadow">
                   Ver6.0テストサーバー
                 </h3>
                 <p className="text-sm sm:text-base text-white drop-shadow">
                   テストサーバーの詳細をチェック！
                 </p>
               </div>
             </div>
            </Link>