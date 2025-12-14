import { useState, useEffect } from 'react'
import { DatePicker, Divider, message, Slider } from 'antd';
import { ClockCircleOutlined, DashboardOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import todoSlice from './app/todoSlice';


function App() {
  const musicPlaylist = {
    Youtube: {
      Noel: 'https://www.youtube.com/embed/M1WtAPZJSlY?si=BWOJYoUUWS9t6WOB',
      Windy: 'https://www.youtube.com/embed/ttEEpPrIzkU?si=vEJ31OUwSEPXrYxl',
    },
    SoundCloud: {
      MTP: 'https://soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1925530323&color=%23d68a8a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false',
      MCK: 'https://soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1660571346&color=%23d68a8a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false',
      Obito: 'https://soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2009224335&color=%23d68a8a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false',
      Tlinh: 'https://soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1685845422&color=%23d68a8a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false',
      Wrxdie: 'https://soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1786869444&color=%23d68a8a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false',
      HTH: 'https://soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1902528475&color=%23d68a8a&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false',
    },

  }

  const tasks = useSelector(state => state.todoList);
  const [inputValue, setInputValue] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState(musicPlaylist.Youtube.Noel);
  const [clock, setClock] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const [showOpacitySlider, setShowOpacitySlider] = useState(false);
  const [opacityValue, setOpacityValue] = useState(50);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showMusicSetting, setShowMusicSetting] = useState(false);
  const [targetMissionId, setTargetMissionId] = useState('');

  const dispatch = useDispatch();


  const addTask = () => {
    if (inputValue.trim() !== '') {
      dispatch(todoSlice.actions.addMission({
        id: Number.parseInt(Date.now()),
        text: inputValue,
        completed: false,
        countDown: null,
      }))
      setInputValue('');
      console.log(Date.now());
    }
  }

  const deleteTask = (id) => {
    dispatch(todoSlice.actions.deleteMission(id));
  }

  const toggleComplete = (id) => {
    dispatch(todoSlice.actions.toggleComplete(id));
  }

  const updateCountDown = (id, time) => {
    dispatch(todoSlice.actions.updateCountDown({ id, time }));
  }
  const success = () => {
    messageApi.open({
      content: 'Good Job Baby!',
      className: 'text-pink-500 font-bold',
      style: {
        marginTop: '1vh',
      },
      duration: 1,
    });
  };

  const removeCountDown = (id) => {
    dispatch(todoSlice.actions.removeCountDown(id));
  }


  const disabledTime = () => {
    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute() + 1;

    return {
      disabledHours: () => {
        // Disable hours trước giờ hiện tại
        return Array.from({ length: currentHour }, (_, i) => i);
      },
      disabledMinutes: (selectedHour) => {
        if (selectedHour === currentHour) {
          return Array.from({ length: currentMinute }, (_, i) => i);
        }
        return [];
      },
      disabledSeconds: () => {
        // Disable tất cả giây trừ 0
        return Array.from({ length: 60 }, (_, i) => i).filter(s => s !== 0);
      },
    };
  };

  const disabledDate = (current) => {
    // Disable tất cả ngày trước hôm nay
    return current && current < dayjs().startOf('day');
  };

  const toggleBg = () => {
    const bgDiv = document.querySelector('.bg-img');
    const bgImage = window.getComputedStyle(bgDiv).backgroundImage.match(/\d+/g);
    let number = Number.parseInt(bgImage[bgImage.length - 1]);
    console.log(number);
    if (number == 3) number = 1;
    else number += 1;
    bgDiv.style.backgroundImage = `url('/${number}.jpg')`;
  }


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setClock(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newValue = 10 * opacityValue / 100;

    document.documentElement.style.setProperty('--glass-blur', `${newValue}rem`);
  }, [opacityValue]);

  return (
    <>
      {contextHolder}
      <div className=" w-screen h-screen bg-img flex relative">

        {/* Mission block */}
        <div className="glass-border w-[35vw] m-auto h-[90vh] flex flex-col p-8 max-[1350px]:w-[40vw]  max-[1280px]:w-[50vw] max-[1024px]:w-[50vw] max-[768px]:w-[95vw] max-[768px]:h-[85vh] max-[768px]:p-4">
          <h1 className="text-center text-7xl mt-6 mb-8 text-white font-bold select-none max-[768px]:text-4xl max-[768px]:mt-3 max-[768px]:mb-4">Mission List</h1>

          {/* Input section */}
          <div className="flex gap-3 mb-6 max-[640px]:gap-2 max-[640px]:mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add new mission baby"
              className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white selection:bg-pink-500/50 max-[640px]:px-2 max-[640px]:py-2 max-[640px]:text-sm"
              maxLength={30}
            />
            <div
              onClick={addTask}
              className="px-6 py-3 bg-white/30 hover:bg-white/40 text-white font-semibold rounded-lg border-2 border-white/50 transition-all cursor-pointer max-[640px]:px-4 max-[640px]:py-2 max-[640px]:text-sm"
            >
              Add
            </div>
          </div>
          <Divider
            dashed
            className="ant-divider"
          />
          {/* Task block */}
          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
            {[...tasks].sort((a, b) => b.id - a.id).map(task => (

              // Task line
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 p-4 bg-white/20 rounded-lg border-2 border-white/30 hover:bg-white/30 transition-all max-[640px]:p-2 max-[640px]:gap-2"
              >

                <div className='flex 2xl:ml-5 '>
                  <div
                    onClick={() => {
                      if (!task.completed) {
                        success();
                        removeCountDown(task.id);
                      }
                      toggleComplete(task.id);
                    }}
                    className={` w-6 h-6 rounded-full border-2 border-white cursor-pointer flex items-center justify-center transition-all
                    ${task.completed ? 'bg-pink-500/70' : 'bg-white/20'}`}
                  >
                    {task.completed && <span className="text-white text-sm select-none">✓</span>}
                  </div>
                  <div className={` ml-2 2xl:ml-5 max-w-[20vw] max-[1690px]:w-[15vw] max-[768px]:max-w-[50vw] max-[640px]:max-w-[55vw] max-[640px]:text-sm wrap-break-word text-white text-lg selection:bg-pink-500/50 ${task.completed ? 'line-through opacity-60' : ''}`}>
                    {task.text}
                  </div>
                </div>



                {/*  Setting block */}
                <div className='flex flex-col text-end'>
                  {task.countDown && !task.completed && (() => {
                    // task.countDown format: "YYYY-MM-DD HH:mm:ss"
                    const targetTime = dayjs(task.countDown);
                    const now = dayjs();
                    const remainSeconds = targetTime.diff(now, 'second');

                    if (remainSeconds < 0) {
                      removeCountDown(task.id);
                      return null;
                    }

                    const day = Math.floor(Math.floor(remainSeconds / 86400));
                    const hour = Math.floor((remainSeconds % 86400) / 3600);
                    const min = Math.floor((remainSeconds % 3600) / 60);
                    const sec = remainSeconds % 60;

                    return (
                      <span className="text-white/80 text-md mr-2 select-none">
                        {day === 0 ? '' : day + 'd '}
                        {hour === 0 ? '' : hour + 'h '}
                        {min === 0 ? '' : min + 'm '}
                        {sec + 's'}
                      </span>
                    )
                  })()}

                  {/* Button div of the middle of setting block: Delete deadline; Set deadline; Delete Task */}
                  <div >
                    {
                      task.countDown && !task.completed && (
                        <button
                          onClick={() => removeCountDown(task.id)
                          }
                          className="mr-2 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition-all hover:cursor-pointer"
                          title='Remove count down'
                        >
                          <MinusCircleOutlined />
                        </button>
                      )
                    }
                    {
                      task.countDown == null && !task.completed && (
                        <button
                          onClick={() => {
                            setTargetMissionId(task.id);
                            setShowTimePicker(!showTimePicker);
                          }}
                          className="mr-2 px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition-all hover:cursor-pointer"

                        >
                          <DashboardOutlined title='Count down this one' />
                        </button>
                      )
                    }
                    <button
                      onClick={() => deleteTask(task.id)}
                      className=" px-4 py-2 bg-white/30 hover:bg-white/40 text-white rounded-lg transition-all hover:cursor-pointer "

                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                  {/* Button div of the middle of setting block*/}

                  {/* Date Picker of the bottom of setting block*/}
                  {showTimePicker && (targetMissionId === task.id) && (
                    <div className='mt-2'>
                      <DatePicker
                        open={showTimePicker}
                        showTime={{ format: "HH:mm ", showSecond: false }}
                        format="YYYY-MM-DD HH:mm"
                        disabledDate={disabledDate}
                        disabledTime={disabledTime}
                        onChange={(timeString) => {
                          updateCountDown(task.id, timeString);
                          setShowTimePicker(false);
                        }}
                        renderExtraFooter={() => <div className='flex justify-around items-center h-10'>
                          <p>Choose your deadline cuhh</p>
                        </div>
                        }
                        minuteStep={5}
                        changeOnScroll
                        showNow={false}
                        needConfirm={true}

                      />
                    </div>
                  )}
                  {/* Date Picker of the bottom of setting block */}

                </div>
                {/*  Setting block */}


              </div>
              //  Task line

            ))}
          </div>
          {/* Task block */}

          {/* Task counter */}
          <div className="mt-4 text-center text-white/80">
            {tasks.length} task{tasks.length > 1 ? 's' : ''} • {tasks.filter(t => t.completed).length} completed
          </div>
          {/* Task counter */}

        </div>
        {/* Mission block */}


        <div className='absolute right-10 top-10 glass-border text-white p-4 hover:cursor-pointer select-none z-30 max-[900px]:hidden'
          onClick={toggleBg}
          title='Maybe flick because of high res image :D'
        >
          Change Background
        </div>

        <div className={`  absolute right-10 bottom-10 max-[1280px]:static max-[1280px]:mx-auto max-[1280px]:mt-4 max-[1280px]:mb-6 max-[1280px]:w-[50vw] max-[1024px]:w-[50vw] max-[768px]:w-[95vw] max-[768px]:p-2 glass-border text-white p-4 select-none  ${showMusicSetting ? '' : 'hover:cursor-pointer'}`}
          onClick={() => { setShowMusicSetting(true) }}
        >
          Give some songs
          {showMusicSetting && (
            <>
              <iframe
                className='2xl:w-[20vw] 2xl:h-[30vh]  mt-1 mx-auto '
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"

                src={currentPlaylist}
              ></iframe>
              <p className='text-center mt-2 text-sm max-[768px]:text-xs px-2 wrap-break-word'>If error occur, not my fault, SoundCloud's fault</p>
              <div className='absolute top-3 right-5 flex flex-nowrap'>
                <select name="chooseSinger" id="music" className='mr-5 border rounded text-center' onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex];
                  const platform = selectedOption.parentElement.label;
                  const song = selectedOption.value;
                  setCurrentPlaylist(musicPlaylist[platform][song]);
                }}>
                  {Object.keys(musicPlaylist).map(platform => {
                    return <optgroup key={platform} label={platform} className='bg-[#e98080]'>
                      {Object.keys(musicPlaylist[platform]).map(song => {
                        return <option
                          key={song}
                          value={song}
                          selected={currentPlaylist === musicPlaylist[platform][song]}
                          className='bg-[#da9b9b] text-start hover:bg-[#e98080]'
                        >
                          {song}
                        </option>
                      })}
                    </optgroup>
                  })
                  }
                </select>
                <div
                  // type='button'
                  className='rounded-lg z-10 cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMusicSetting(false);
                  }}
                >
                  X
                </div>
              </div>
            </>
          )}
        </div>

        {/* Clock At Left Conner */}
        <div
          className='absolute left-10 top-10 glass-border text-white p-4 hover:cursor-not-allowed select-none text-3xl max-[900px]:hidden'
          title='Time doesnt comeback but we can comeback to they:)'>
          <ClockCircleOutlined />  {clock}
        </div>

        {/* Slider at the right conner */}
        <div className="absolute top-30 right-10 glass-border text-white text-center p-4 max-[900px]:hidden">
          <span onClick={() => setShowOpacitySlider(true)} className={`${showOpacitySlider ? 'mr-4' : 'cursor-pointer'} `}>Glass opacity</span>
          <span onClick={() => setShowOpacitySlider(false)} className={`${showOpacitySlider ? 'cursor-pointer' : 'hidden'}`} >X</span>
          {showOpacitySlider && (
            <div>
              <Slider horizontal min={30} value={opacityValue} onChange={(value) => setOpacityValue(value)} />
            </div>
          )}
        </div>

      </div >
    </>
  )
}
export default App
