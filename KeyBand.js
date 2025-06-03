function handleResponsiveUI() {
    // --- 1. iframe 스케일 조정 ---
    const baseWidth = 860;
    const wrapper = document.querySelector('.responsive-iframe-wrapper');
    const iframe = document.querySelector('.responsive-iframe');
    if (wrapper && iframe) {
        const scale = wrapper.offsetWidth / baseWidth;
        iframe.style.transform = `scale(${scale})`;
    }

    // --- 2. 레이아웃 및 요소 크기 동적 조정 ---
    const width = window.innerWidth;
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const nav = document.querySelector('nav');
    const section = document.querySelector('section');
    const aside = document.querySelector('aside');

    if (width <= 800) {
        // 제목, 버튼 크기 동적 조정
        if (title)   title.style.fontSize = Math.max(2.2, Math.min(5, width / 100)) + 'em';
        if (subtitle){
            subtitle.style.fontSize = Math.max(1, Math.min(1.7, width / 700)) + 'em';
            subtitle.style.marginTop = Math.max(-30, Math.min(-30, -width / 50)) + 'px';
        }
        // REC 텍스트, 타이머 숨기기
        document.querySelectorAll('.recode_text, #record_time').forEach(el => {
            el.style.display = 'none';
        });
        // 악기버튼
        document.querySelectorAll('.instrument_button').forEach(btn => {
            btn.style.width = btn.style.height = Math.max(45, Math.min(80, width / 6)) + 'px';
            btn.style.backgroundSize = 'cover';
        });
        // nav/aside 폰트 크기 조정 (예시: 13~19px)
        const navFontSize = Math.max(13, Math.min(19, width / 45)) + 'px';
        const AsideFontSize = Math.max(8, Math.min(17, width / 60)) + 'px';
        if (nav)   nav.style.fontSize = navFontSize;
        if (aside) aside.style.fontSize = AsideFontSize;

        // 동그란 버튼/이미지
        document.querySelectorAll('.upload_button, .recode_button, .download_button').forEach(btn => {
            btn.style.width = btn.style.height = Math.max(25, Math.min(40, width / 10)) + 'px';
        });
        document.querySelectorAll('.upload_img, .recode_img, .download_img').forEach(img => {
            img.style.width = img.style.height = 20 + 'px';
        });

        // 레이아웃 : section 숨기고 nav/aside 50%씩
        if (section) section.style.display = 'none';
        if (nav) {
            nav.style.display = 'inline-block';
            nav.style.width = '50%';
            nav.style.float = 'left';
        }
        if (aside) {
            aside.style.display = 'inline-block';
            aside.style.width = '50%';
            aside.style.float = 'left';
        }
    } else {
        // REC 텍스트, 타이머 다시 보이게(원래대로)
        document.querySelectorAll('.recode_text, #record_time').forEach(el => {
            el.style.display = '';
        });
        // 크기 및 레이아웃 원래대로
        if (title) title.style.fontSize = '';
        if (subtitle){
            subtitle.style.fontSize = '';
            subtitle.style.marginTop = '';
        } 
        // nav/aside 폰트 크기 원복
        if (nav)   nav.style.fontSize = '';
        if (aside) aside.style.fontSize = '';
        document.querySelectorAll('.instrument_button').forEach(btn => {
            btn.style.width = btn.style.height = '';
            btn.style.backgroundSize = '';
        });
        document.querySelectorAll('.upload_button, .recode_button, .download_button').forEach(btn => {
            btn.style.width = btn.style.height = '';
        });
        document.querySelectorAll('.upload_img, .recode_img, .download_img').forEach(img => {
            img.style.width = img.style.height = '';
        });

        if (section) section.style.display = '';
        if (nav) {
            nav.style.display = '';
            nav.style.width = '';
            nav.style.float = '';
        }
        if (aside) {
            aside.style.display = '';
            aside.style.width = '';
            aside.style.float = '';
        }
    }
}

window.addEventListener('DOMContentLoaded', handleResponsiveUI);
window.addEventListener('resize', handleResponsiveUI);
const hour = new Date().getHours();//현재시간 객체 생성
if (hour >= 18 || hour < 6)//밤 시간일 경우
    //밤하늘 이미지로 배경이미지 변환
    document.body.style.backgroundImage = 'url("background_night.png")';

// 페이지 로딩 시 비활성화
document.querySelector(".recode_button").classList.add("disabled");

function selectInstrument(name) {
    document.getElementById("selectedInstrument").textContent = name;
}

function selectInstrument(name) {
    document.getElementById("selectedInstrument").textContent = name;
    document.querySelector(".recode_button").classList.remove("disabled");
}

let recordInterval = null;//setInterval 변수
let recordSeconds = 0;//초 단위 변수

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioPlayerSource = null;
let mediaRecorder = null;
let recordedChunks = [];
let destination = null;
//체크박스 체크 감지
document.getElementById("recode_check").addEventListener("change", function (e) {
    const timerDisplay = document.getElementById("record_time");

    if (e.target.checked) {
        // ⏱️ 타이머 시작
        recordSeconds = 0;
        timerDisplay.textContent = "00:00";
        if (recordInterval) clearInterval(recordInterval);
        recordInterval = setInterval(() => {
            recordSeconds++;
            const minutes = String(Math.floor(recordSeconds / 60)).padStart(2, '0');
            const seconds = String(recordSeconds % 60).padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }, 1000);

        // 🎙️ 녹음 설정
        destination = audioContext.createMediaStreamDestination();
        recordedChunks = [];

        mediaRecorder = new MediaRecorder(destination.stream);
        mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);

            // 🎧 결과 재생
            const audioPlayer = document.getElementById("playback");
            audioPlayer.src = url;

            const downloadLink = document.getElementById("download_link");
            downloadLink.href = url;
            downloadLink.download = "KeyBand_recording.wav";
        };
        const tmpiframe = document.querySelector("iframe[name='footer']");
        tmpiframe?.contentWindow?.postMessage({ type: "playDummyAudio" }, "*");
                const audioPlayer = document.getElementById("playback");
        if (!audioPlayerSource) {
            audioPlayerSource = audioContext.createMediaElementSource(audioPlayer);
            audioPlayerSource.connect(audioContext.destination);
            audioPlayerSource.connect(destination);
        } else {
            // 이미 연결되어 있으므로 새로 연결하지 않음
            // 단, 새로운 destination에도 연결 필요
            audioPlayerSource.connect(destination);
        }
        mediaRecorder.start();
        audioContext.resume();

        // 📩 iframe에 오디오 context 연결 요청
        const iframe = document.querySelector("iframe[name='footer']");
        iframe?.contentWindow?.postMessage({ type: "sendContextInfo" }, "*");

    } else {
        // ⏹️ 타이머 & 녹음 종료
        if (recordInterval) clearInterval(recordInterval);
        timerDisplay.textContent = "";

        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }
    }
});

let currentAudioURL = null;//현재 재생 중인 오디오 Blob URL 저장
//파일 업로드 시 실행
document.getElementById("upload_file").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const audioPlayer = document.getElementById("playback");

    if (file) {
        if (currentAudioURL) {
            URL.revokeObjectURL(currentAudioURL);
        }

        currentAudioURL = URL.createObjectURL(file);
        audioPlayer.src = currentAudioURL;

        const downloadLink = document.getElementById("download_link");
        downloadLink.href = currentAudioURL;
        downloadLink.download = file.name;
    }

    // 🔁 input을 초기화해서 동일 파일 재선택도 인식되도록
    event.target.value = "";
});

document.addEventListener('keydown', function (e) {//키보드 입력 발생하면
    const iframe = document.querySelector("iframe[name='footer']");
    if (iframe && iframe.contentWindow) {
        //iframe 내부에 포커스 전달
        iframe.contentWindow.focus();
    }
});

window.addEventListener("message", (event) => {
    if (event.data.type === "forwardAudio") {
        const audio = document.createElement("audio");
        audio.src = event.data.src;
        audio.crossOrigin = "anonymous";
        audio.volume = 1.0;

        audio.addEventListener("canplaythrough", () => {
            const source = audioContext.createMediaElementSource(audio);
            source.connect(audioContext.destination);
            source.connect(destination);
            audio.play();
        });

        audio.load(); // 명시적으로 로딩 시작
    }
});
