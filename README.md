# 🎶 KeyBand

**Your Keyboard Becomes Your Band**  
키보드로 피아노와 드럼을 연주하고, 녹음하고, 함께 합주해보세요!

📺 **시연 영상**  
👉 [https://youtube.com/shorts/z0Inaqbj6yo?feature=share](https://youtube.com/shorts/z0Inaqbj6yo?feature=share)

---

## ✨ 주요 기능

- 🎹 **악기 선택**: 피아노 / 드럼 중 하나 선택 가능 (`iframe`으로 연주 UI 불러오기)
- ⌨️ **키보드 & 마우스 연주**: 키보드 입력 또는 마우스로 실시간 연주
- 🔴 **녹음 기능**: 오디오 녹음 및 다운로드 (`.webm` 포맷)
- 🎵 **오디오 업로드 및 재생**: 기존 음악 파일 불러와 함께 연주 가능
- 📱 **반응형 UI**: 모바일에서도 사용 가능한 인터페이스
- 🚫 **iOS Safari 녹음 비활성화 감지**: 자동으로 녹음 비활성화 및 경고 표시

---

## 📁 프로젝트 구조

```
KeyBand/
├── piano/                 # 피아노 관련 리소스 및 HTML
│   └── piano.html
│   └── piano_key.png
│   └── audio/
│       └── piano_key.mp3
├── drum/                  # 드럼 관련 리소스 및 HTML
│   └── drum.html
│   └── drum_key.png
│   └── audio/
│       └── drum_key.mp3
├── buttons/               # 버튼 아이콘 이미지
│   └── upload.png
│   └── recode.png
│   └── recode_stop.png
│   └── download.png
├── background.png         # 배경 이미지 (낮)
├── background_night.png   # 배경 이미지 (밤)
├── index.html           # 메인 HTML 파일
├── KeyBand.css            # 스타일 시트
├── KeyBand.js             # 기능 구현 자바스크립트
├── dummy.mp3              # 녹음을 위한 더미오디오
└── default.mp3            # 초기 재생 오디오
```

---

## ⚙️ 사용 기술

- HTML5 / CSS3
- JavaScript (Vanilla)
- Web Audio API
- MediaRecorder API
- Responsive Web Design

---

## ⚠️ iOS Safari 주의사항

> iOS Safari에서는 `MediaRecorder`가 지원되지 않아 녹음 기능이 **자동으로 비활성화**됩니다.

---

## 👨‍💻 개발자

- 동국대학교 멀티미디어공학과    
- 이름: **이병현**
- 📧 이메일: pilot803@naver.com

---

## 📜 라이선스

> 본 프로젝트는 개인 학습 및 포트폴리오 용도로 제작되었습니다.
