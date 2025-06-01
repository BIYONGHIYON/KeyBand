const hour = new Date().getHours();//현재시간 객체 생성
    if (hour >= 18 || hour < 6)//밤 시간일 경우
        //밤하늘 이미지로 배경이미지 변환
        document.body.style.backgroundImage = 'url("background_night.png")';
        
function selectInstrument(name) {//매개변수로 선택된 악기 이름 
    document.getElementById("selectedInstrument").innerText = name;//selectedInstrument에 name값 출력
}

let recordInterval = null;//setInterval 변수
let recordSeconds = 0;//초 단위 변수
//체크박스 체크 감지
document.getElementById("recode_check").addEventListener("change", function (e) {
    const timerDisplay = document.getElementById("record_time");//녹음 시간 표시할 상수

    if (e.target.checked) {//체크박스 체크시
        recordSeconds = 0;//녹음 시간 초기화
        timerDisplay.textContent = "00:00";//초기 화면 표시

        recordInterval = setInterval(() => {//1초마다 실행되는 타이머 설정
            recordSeconds++; //경과 시간 1초 증가
            const minutes = String(Math.floor(recordSeconds / 60)).padStart(2, '0');
            const seconds = String(recordSeconds % 60).padStart(2, '0');
            timerDisplay.textContent = `${minutes}:${seconds}`;//화면에 "분:초"로 표시
        }, 1000); //1초 간격
    } else {//체크 해제시
        clearInterval(recordInterval);//타이머 중지
        timerDisplay.textContent = "";//화면에서 시간 제거
    }
});

let currentAudioURL = null;//현재 재생 중인 오디오 Blob URL 저장
//파일 업로드 시 실행
document.getElementById("upload_file").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const audioPlayer = document.getElementById("playback");

    if (file) {
        if (currentAudioURL) {//메모리 누수 방지
            URL.revokeObjectURL(currentAudioURL);
        }

        currentAudioURL = URL.createObjectURL(file);
        audioPlayer.src = currentAudioURL;

        //다운로드 링크 설정
        const downloadLink = document.getElementById("download_link");
        downloadLink.href = currentAudioURL;
        downloadLink.download = file.name;//원래 파일명으로 다운로드
    }
});

document.addEventListener('keydown', function (e) {//키보드 입력 발생하면
    const iframe = document.querySelector("iframe[name='footer']");
    if (iframe && iframe.contentWindow) {
        //iframe 내부에 포커스 전달
        iframe.contentWindow.focus();
    }
});
