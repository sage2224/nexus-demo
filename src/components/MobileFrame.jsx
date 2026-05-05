import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle2, ChevronRight, ChevronDown, Lightbulb, TrendingUp, TrendingDown, Search, Home, Wallet, Compass, Target, History, X, Shield, Smartphone, Share2, RefreshCcw, Info, Loader2, Sun, UserX, ScanFace, Lock, ShieldCheck, User, FileText, BarChart2, Calculator, Newspaper, GraduationCap, CreditCard, Sparkles, Bell, Fingerprint, Check, Zap } from 'lucide-react';

const MobileFrame = ({ activeTab }) => {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPowerBreakdown, setShowPowerBreakdown] = useState(false);
  const [showKYCPopup, setShowKYCPopup] = useState(false);
  const [isClosingKYC, setIsClosingKYC] = useState(false);
  const [selectedKYCMethod, setSelectedKYCMethod] = useState(null);
  const [kycStep, setKycStep] = useState('selection');
  const [vneidConsent, setVneidConsent] = useState(false);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [showErrorSheet, setShowErrorSheet] = useState(false);
  const [livenessStep, setLivenessStep] = useState('ready'); // 'ready' | 'camera' | 'success'
  const [cameraPhase, setCameraPhase] = useState('position'); // 'position' | 'detecting' | 'verifying'
  const [selectedGalleryApp, setSelectedGalleryApp] = useState('revolut');
  const [currentGallerySectionIndex, setCurrentGallerySectionIndex] = useState(0);
  const [currentGalleryImageIndex, setCurrentGalleryImageIndex] = useState(0);
  const [demoHomeState, setDemoHomeState] = useState(0); // 0: Unverified, 1: Verified, 2: Funded, 3: Invested
  const [showPasskeyPopup, setShowPasskeyPopup] = useState(false);
  const [showPowerDetail, setShowPowerDetail] = useState(false);

  const galleryApps = {
    revolut: {
      id: 'revolut',
      title: 'Mẫu 1: Revolut',
      description: 'Phong cách Fintech tối giản và thanh lịch',
      sections: [
        {
          name: 'Revolut iOS Onboarding',
          images: Array.from({ length: 23 }, (_, i) => `/images/revolut/Revolut iOS Onboarding ${i + 1}.png`)
        },
        {
          name: 'Revolut iOS Verifying identity',
          images: Array.from({ length: 23 }, (_, i) => `/images/revolut_verifying/Revolut iOS Verifying identity ${i}.png`)
        },
        {
          name: 'Revolut iOS Home',
          images: Array.from({ length: 6 }, (_, i) => `/images/revolut_home/Revolut iOS Home ${i}.png`)
        },
        {
          name: 'Revolut iOS Adding money',
          images: Array.from({ length: 6 }, (_, i) => `/images/revolut_adding/Revolut iOS Adding money ${i}.png`)
        },
        {
          name: 'Revolut iOS Moving money',
          images: Array.from({ length: 7 }, (_, i) => `/images/revolut_moving/Revolut iOS Moving money ${i}.png`)
        },
        {
          name: 'Revolut iOS Adding money (Invest)',
          images: Array.from({ length: 5 }, (_, i) => `/images/revolut_invest/Revolut iOS Adding money (Invest) ${i}.png`)
        },
        {
          name: 'Revolut iOS Robo-advisor',
          images: Array.from({ length: 4 }, (_, i) => `/images/revolut_robo/Revolut iOS Robo-advisor ${i}.png`)
        },
        {
          name: 'Revolut iOS Learning Ethena',
          images: Array.from({ length: 12 }, (_, i) => `/images/revolut_ethena/Revolut iOS Learning Ethena ${i}.png`)
        },
        {
          name: 'Revolut iOS Lifestyle',
          images: Array.from({ length: 4 }, (_, i) => `/images/revolut_lifestyle/Revolut iOS Lifestyle ${i}.png`)
        },
        {
          name: 'Revolut iOS Referring friends',
          images: Array.from({ length: 6 }, (_, i) => `/images/revolut_friends/Revolut iOS Referring friends ${i}.png`)
        }
      ]
    },
    fuse: {
      id: 'fuse',
      title: 'Mẫu 2: Fuse',
      description: 'Thiết kế hiện đại tập trung vào trải nghiệm số',
      sections: [
        {
          name: 'Fuse iOS Onboarding',
          images: [
            '/images/fuse_onboarding/Fuse iOS Onboarding 1.png',
            '/images/fuse_onboarding/Fuse iOS Onboarding 0.png',
            ...Array.from({ length: 11 }, (_, i) => `/images/fuse_onboarding/Fuse iOS Onboarding ${i + 2}.png`)
          ]
        },
        {
          name: 'Fuse iOS Home',
          images: Array.from({ length: 2 }, (_, i) => `/images/fuse_home/Fuse iOS Home ${i}.png`)
        },
        {
          name: 'Fuse iOS Investment detail',
          images: Array.from({ length: 3 }, (_, i) => `/images/fuse_investment/Fuse iOS Investment detail ${i}.png`)
        },
        {
          name: 'Fuse iOS Withdrawing a coin',
          images: Array.from({ length: 5 }, (_, i) => `/images/fuse_withdrawing/Fuse iOS Withdrawing a coin ${i}.png`)
        },
        {
          name: 'Fuse iOS Editing a wallet',
          images: Array.from({ length: 5 }, (_, i) => `/images/fuse_editing/Fuse iOS Editing a wallet ${i}.png`)
        }
      ]
    },
    wise: {
      id: 'wise',
      title: 'Mẫu 3: Wise',
      description: 'Thiết kế trực quan tập trung vào giao dịch quốc tế',
      sections: [
        {
          name: 'Wise iOS Onboarding',
          images: Array.from({ length: 6 }, (_, i) => `/images/wise_onboarding/Wise iOS Onboarding ${i + 1}.png`)
        },
        {
          name: 'Wise iOS Creating an account',
          images: Array.from({ length: 33 }, (_, i) => `/images/wise_account/Wise iOS Creating an account ${i}.png`)
        },
        {
          name: 'Wise iOS Home',
          images: Array.from({ length: 10 }, (_, i) => `/images/wise_home/Wise iOS Home ${i}.png`)
        },
        {
          name: 'Wise iOS Ordering a digital card',
          images: Array.from({ length: 13 }, (_, i) => `/images/wise_card/Wise iOS Ordering a digital card ${i}.png`)
        }
      ]
    },
    neo: {
      id: 'neo',
      title: 'Mẫu 4: Neo Financial',
      description: 'Illustration-led design, mang phong cách sáng tạo.',
      sections: [
        {
          name: 'Neo Financial iOS Onboarding',
          images: Array.from({ length: 22 }, (_, i) => `/images/neo_onboarding/Neo Financial iOS Onboarding ${i}.png`)
        },
        {
          name: 'Neo Financial iOS Neo Credit walkthrough',
          images: Array.from({ length: 5 }, (_, i) => `/images/neo_walkthrough/Neo Financial iOS Neo Credit walkthrough ${i}.png`)
        },
        {
          name: 'Neo Financial iOS Credit',
          images: Array.from({ length: 3 }, (_, i) => `/images/neo_credit/Neo Financial iOS Credit ${i}.png`)
        },
        {
          name: 'Neo Financial iOS Bundle detail',
          images: Array.from({ length: 3 }, (_, i) => `/images/neo_bundle/Neo Financial iOS Bundle detail ${i}.png`)
        }
      ]
    },
    kraken: {
      id: 'kraken',
      title: 'Mẫu 5: Kraken',
      description: 'Màu sắc trẻ trung, trải nghiệm số hiện đại.',
      sections: [
        {
          name: 'Kraken iOS Onboarding',
          images: Array.from({ length: 16 }, (_, i) => `/images/kraken_onboarding/Kraken iOS Onboarding ${i}.png`)
        },
        {
          name: 'Kraken iOS Home',
          images: Array.from({ length: 6 }, (_, i) => `/images/kraken_home/Kraken iOS Home ${i}.png`)
        },
        {
          name: 'Kraken iOS Setting target price',
          images: Array.from({ length: 6 }, (_, i) => `/images/kraken_target/Kraken iOS Setting target price ${i}.png`)
        },
        {
          name: 'Kraken iOS Explore',
          images: Array.from({ length: 5 }, (_, i) => `/images/kraken_explore/Kraken iOS Explore ${i}.png`)
        }
      ]
    }
  };

  const handleCloseKYC = () => {
    setIsClosingKYC(true);
    setTimeout(() => {
      setShowKYCPopup(false);
      setIsClosingKYC(false);
      setKycStep('selection');
      setOnboardingStep(5);
    }, 600);
  };

  useEffect(() => {
    let timer;
    if ((onboardingStep === 3 || (activeTab === 'time-to-value' && demoHomeState === 2)) && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [onboardingStep, demoHomeState, activeTab, countdown]);

  useEffect(() => {
    if (activeTab === 'time-to-value' && demoHomeState === 2) {
      setCountdown(30);
    }
  }, [demoHomeState, activeTab]);



  const InvestingChart = () => (
    <div style={{ height: '80px', width: '100%', margin: '0 0 24px', overflow: 'visible' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <polyline
          fill="none"
          stroke="#16a34a"
          strokeWidth="2.5"
          points="0,50 10,48 20,52 30,40 40,42 50,30 60,35 70,20 80,25 90,10 100,15"
          className="chart-line-draw"
          style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />
      </svg>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'time-to-value':
        const renderDemoHome = (step) => {
          const states = [
            { type: 'splash' },
            { type: 'phone' },
            { type: 'otp' },
            { type: 'password' },
            { type: 'welcome' },
            {
              type: 'home',
              statusStrip: "Xác thực danh tính để bắt đầu đầu tư ngay",
              heroEyebrow: "NẾU ĐẦU TƯ 5 TRIỆU VÀO FUESSV30 CÁ CÁCH ĐÂY 1 NĂM",
              heroMain: "+960.000 ₫",
              heroSub: "Dựa trên hiệu suất thực tế của Quỹ ETF SSIAM VN30 năm 2024.",
              heroCTAs: ["Xác thực để bắt đầu"],
              actionsDisabled: true,
              portfolioHeading: "Gợi ý cho bạn",
              portfolioContent: { title: "ETF VN30", sub: "Rổ 30 cổ phiếu hàng đầu VN", value: "+16.9%" }
            },
            {
              type: 'home',
              statusStrip: "Xác thực danh tính để bắt đầu đầu tư ngay",
              heroEyebrow: "NẾU ĐẦU TƯ 5 TRIỆU VÀO FUESSV30 CÁ CÁCH ĐÂY 1 NĂM",
              heroMain: "+960.000 ₫",
              heroSub: "Dựa trên hiệu suất thực tế của Quỹ ETF SSIAM VN30 năm 2024.",
              heroCTAs: ["Xác thực để bắt đầu"],
              actionsDisabled: true,
              portfolioHeading: "Gợi ý cho bạn",
              portfolioContent: { title: "ETF VN30", sub: "Rổ 30 cổ phiếu hàng đầu VN", value: "+16.9%" }
            },
            {
              type: 'home',
              statusStrip: "Tài khoản đã xác thực. Nạp tiền để nhận ưu đãi đầu tư.",
              heroEyebrow: "SỨC MUA",
              heroMain: "100.000 ₫",
              heroSub: "Nạp tiền để bắt đầu những thương vụ đầu tiên",
              heroCTAs: ["Liên kết TK ngân hàng"],
              showFact: true,
              factLine: "Nếu đầu tư 5 triệu vào FUESSV30 cách đây 1 năm",
              factNumber: "+960.000 ₫",
              actionsDisabled: false,
              portfolioHeading: "Gợi ý cho bạn",
              portfolioContent: { title: "Bắt đầu danh mục", sub: "Tìm hiểu các cổ phiếu tiềm năng", value: "---" }
            },
            {
              type: 'home',
              statusStrip: null,
              heroEyebrow: "SỨC MUA",
              heroMain: "50.100.000 ₫",
              heroSub: "Bạn có thể mua ~1.800 cổ phiếu HPG hoặc 400 cổ phiếu FPT",
              heroCTAs: ["Đầu tư ngay"],
              actionsDisabled: false,
              portfolioHeading: "Gợi ý cho bạn",
              portfolioContent: { title: "Cổ phiếu đề xuất", sub: "Dựa trên khẩu vị rủi ro trung bình", value: "Top pick" }
            },
            {
              type: 'home',
              statusStrip: null,
              heroEyebrow: "TỔNG TÀI SẢN",
              heroMain: "124.500.000 ₫",
              heroSub: null,
              heroCTAs: [],
              purchasingPower: "50.100.000 ₫",
              actionsDisabled: false,
              showInvestingChart: true,
              portfolioHeading: "Danh mục của bạn",
              portfolioContent: { title: "Cổ phiếu & Quỹ", sub: "VIC, HPG, VNM, FUEVFVND...", value: "+8.4%" }
            }
          ];

          const data = states[step];

          if (data.type === 'splash') {
            return (
              <div className="demo-screen" style={{ textAlign: 'center', justifyContent: 'center', padding: '32px 24px', background: '#fcfcfc' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 className="demo-title" style={{ fontSize: '2.25rem', marginBottom: '16px', lineHeight: '1.1', color: '#1a1a1a' }}>
                    Đầu tư chất,<br />'phất' cùng NEXUS!
                  </h2>
                  <p className="demo-subtitle" style={{ fontSize: '1rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                    Chốt deal xịn, từ TẬP SỰ đến PRO - đầu tư chưa bao giờ dễ đến thế.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto' }}>
                  <button className="demo-button" style={{ fontSize: '1.125rem', padding: '18px', background: '#1a1a1a' }} onClick={() => setDemoHomeState(1)}>
                    Bắt đầu ngay!
                  </button>

                  <button
                    style={{ background: 'none', border: 'none', color: '#555555', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', padding: '8px' }}
                    onClick={() => setDemoHomeState(1)}
                  >
                    Đã có tài khoản? <span style={{ color: '#1a1a1a' }}>Đăng nhập</span>
                  </button>

                  <div style={{ marginTop: '24px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#888888', marginBottom: '16px' }}>Hoặc kết nối nhanh qua:</p>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                      <button style={{ flex: 1, padding: '12px 4px', borderRadius: '12px', border: '1px solid #e5e5e5', background: 'white', color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                        Apple
                      </button>
                      <button style={{ flex: 1, padding: '12px 4px', borderRadius: '12px', border: '1px solid #e5e5e5', background: 'white', color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                        Google
                      </button>
                      <button style={{ flex: 1, padding: '12px 4px', borderRadius: '12px', border: '1px solid #e5e5e5', background: 'white', color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                        Zalo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (data.type === 'phone') {
            return (
              <div className="demo-screen" style={{ textAlign: 'left', padding: '32px 24px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <button onClick={() => setDemoHomeState(0)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', marginBottom: '16px', display: 'flex', alignItems: 'center', color: '#333333' }}><ArrowLeft size={24} /></button>
                  <h2 className="demo-title" style={{ fontSize: '1.75rem', marginBottom: '12px', lineHeight: '1.2' }}>Cho Nexus xin SỐ của bạn nhé!</h2>
                  <p className="demo-subtitle" style={{ fontSize: '0.95rem', color: '#555555' }}>Một mã OTP sẽ được gửi tới để xác nhận số điện thoại của bạn</p>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem', color: '#333333' }}>Số điện thoại</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '0 16px', background: 'white' }}>
                    <span style={{ fontWeight: 600, color: '#333333', paddingRight: '12px', borderRight: '1px solid #e5e5e5' }}>+84</span>
                    <input type="tel" placeholder="Nhập số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ flex: 1, padding: '16px 12px', border: 'none', outline: 'none', fontSize: '1rem' }} />
                  </div>
                </div>
                <button className="demo-button" onClick={() => setDemoHomeState(2)} style={{ marginTop: 'auto' }}>Tiếp tục</button>
              </div>
            );
          }

          if (data.type === 'otp') {
            return (
              <div className="demo-screen" style={{ textAlign: 'left', padding: '32px 24px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <button onClick={() => setDemoHomeState(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', marginBottom: '16px', display: 'flex', alignItems: 'center', color: '#333333' }}><ArrowLeft size={24} /></button>
                  <h2 className="demo-title" style={{ fontSize: '1.75rem', marginBottom: '12px', lineHeight: '1.2' }}>Check tin nhắn ngay!</h2>
                  <p className="demo-subtitle" style={{ fontSize: '0.95rem', color: '#555555' }}>
                    Nhập mã OTP gồm 6 chữ số vừa được gửi đến số <span style={{ color: '#1a1a1a', fontWeight: 600 }}>{phoneNumber ? `+84 ${phoneNumber}` : '[09x xxx xxxx]'}</span> để kích hoạt tài khoản Nexus
                  </p>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginBottom: '24px' }}>
                    {[1, 2, 3, 4, 5, 6].map((i) => <input key={i} type="text" maxLength={1} placeholder="-" style={{ width: '42px', height: '56px', fontSize: '1.5rem', textAlign: 'center', border: '1px solid #e5e5e5', borderRadius: '12px', background: 'white' }} />)}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.9rem', color: '#555555', marginBottom: '16px' }}>
                      Bạn chưa nhận được mã? {countdown > 0 ? (
                        <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Gửi lại sau {countdown}s</span>
                      ) : (
                        <button style={{ background: 'none', border: 'none', color: '#1a1a1a', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Gửi lại ngay</button>
                      )}
                    </p>

                    <button
                      onClick={() => setDemoHomeState(1)}
                      style={{ background: 'none', border: 'none', color: '#555555', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'none' }}
                    >
                      Đổi số điện thoại khác
                    </button>
                  </div>
                </div>

                <button className="demo-button" onClick={() => setDemoHomeState(3)} style={{ marginTop: 'auto' }}>Xác nhận</button>
              </div>
            );
          }

          if (data.type === 'password') {
            return (
              <div className="demo-screen" style={{ textAlign: 'left', padding: '32px 24px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <button onClick={() => setDemoHomeState(2)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', marginBottom: '16px', display: 'flex', alignItems: 'center', color: '#333333' }}><ArrowLeft size={24} /></button>
                  <h2 className="demo-title" style={{ fontSize: '1.75rem', marginBottom: '12px', lineHeight: '1.2' }}>Thiết lập mật khẩu</h2>
                  <p className="demo-subtitle" style={{ fontSize: '0.95rem', color: '#555555', marginBottom: 0, lineHeight: '1.5' }}>Đặt mật khẩu để bảo vệ tài khoản của bạn nhé!</p>
                </div>

                <div style={{ marginBottom: '20px', marginTop: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem', color: '#333333' }}>Nhập mật khẩu mật thiết</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '0 16px', background: 'white' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      style={{ flex: 1, padding: '16px 0', border: 'none', outline: 'none', fontSize: '1rem' }}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888888', padding: '8px' }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem', color: '#333333' }}>Nhập lại lần nữa cho chắc</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '0 16px', background: 'white' }}>
                    <input
                      type="password"
                      placeholder="••••••••"
                      style={{ flex: 1, padding: '16px 0', border: 'none', outline: 'none', fontSize: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ padding: '0 4px', marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Yêu cầu bảo mật:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      "Ít nhất 8 ký tự.",
                      "Bao gồm chữ cái và con số.",
                      "Thêm 1 ký tự đặc biệt (!, @, #)."
                    ].map((text, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={16} color="#d1d5db" />
                        <span style={{ fontSize: '0.85rem', color: '#555555' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="demo-button" onClick={() => setDemoHomeState(4)} style={{ marginTop: 'auto' }}>Tạo tài khoản ngay!</button>
              </div>
            );
          }

          if (data.type === 'welcome') {
            return (
              <div className="demo-screen" style={{ textAlign: 'center', justifyContent: 'center', padding: '32px 24px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ marginBottom: '24px', color: '#1a1a1a' }}>
                    <Check size={48} strokeWidth={1} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#888888', letterSpacing: '1px', marginBottom: '12px', textTransform: 'uppercase' }}>TÀI KHOẢN ĐÃ TẠO</div>
                  <h2 className="demo-title" style={{ fontSize: '1.75rem', marginBottom: '16px', lineHeight: '1.2' }}>Chào mừng bạn đến với Nexus</h2>
                  <p className="demo-subtitle" style={{ fontSize: '1rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                    Tài khoản của bạn đã sẵn sàng. Xác thực danh tính để bắt đầu đầu tư và sử dụng ví!
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                  <button className="demo-button" style={{ background: '#1a1a1a' }} onClick={() => { setDemoHomeState(6); setShowKYCPopup(true); }}>
                    Xác thực ngay
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div className="demo-screen" style={{ padding: 0, overflow: 'hidden', background: '#fcfcfc', display: 'flex', flexDirection: 'column' }}>
              {/* Section 1: Top App Bar */}
              <div style={{ padding: '48px 20px 12px', background: 'white', display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#333333', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>A</div>
                <div style={{ flex: 1, background: '#f5f5f5', borderRadius: '20px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={16} color="#888888" />
                  <span style={{ color: '#888888', fontSize: '0.85rem' }}>Tìm cổ phiếu, quỹ...</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <button style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', color: '#1a1a1a' }}><Bell size={20} /></button>
                  <div style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', background: '#dc2626', borderRadius: '50%', border: '2px solid white' }}></div>
                </div>
              </div>

              {/* Section 2: Status Strip */}
              {data.statusStrip && (
                <div style={{ background: '#fff7ed', borderBottom: '1px solid #ffedd5', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#9a3412' }}>{data.statusStrip}</span>
                  <ChevronRight size={14} color="#9a3412" />
                </div>
              )}

              <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* Section 3: Hero Block */}
                <div style={{ 
                  margin: '20px', 
                  padding: (demoHomeState === 5 || demoHomeState === 6 || demoHomeState === 7 || demoHomeState === 8 || demoHomeState === 9) ? '12px 24px' : '32px 24px', 
                  background: (demoHomeState === 5 || demoHomeState === 6 || demoHomeState === 7 || demoHomeState === 8 || demoHomeState === 9) ? 'transparent' : 'white', 
                  borderRadius: '24px', 
                  border: (demoHomeState === 5 || demoHomeState === 6 || demoHomeState === 7 || demoHomeState === 8 || demoHomeState === 9) ? 'none' : '1px solid #f0f0f0', 
                  boxShadow: (demoHomeState === 5 || demoHomeState === 6 || demoHomeState === 7 || demoHomeState === 8 || demoHomeState === 9) ? 'none' : '0 8px 32px rgba(0,0,0,0.04)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  minHeight: (demoHomeState === 5 || demoHomeState === 6 || demoHomeState === 7 || demoHomeState === 8 || demoHomeState === 9) ? 'auto' : '220px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#888888', letterSpacing: '0.5px' }}>{data.heroEyebrow}</div>
                    {(demoHomeState === 7 || demoHomeState === 8) && (
                      <button 
                        onClick={() => setShowPowerDetail(true)}
                        style={{ background: 'none', border: 'none', color: '#1a1a1a', fontSize: '0.85rem', fontWeight: 600, padding: '4px 8px', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Chi tiết
                      </button>
                    )}
                  </div>
                  
                  {data.showInvestingChart && (
                    <>
                      <InvestingChart />
                      <div style={{ height: '1.5px', background: '#16a34a', margin: '-12px 0 16px', opacity: 0.2, width: '100%' }}></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', gap: '24px' }}>
                          {['1H', '1D', '1W', '1Y'].map(time => (
                            <div key={time} style={{ fontSize: '0.75rem', fontWeight: 800, color: time === '1D' ? '#16a34a' : '#888888', cursor: 'pointer' }}>
                              {time}
                            </div>
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 6px', background: '#f0fdf4', borderRadius: '4px', border: '1px solid #dcfce7' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a' }}></div>
                          <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Live</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {(demoHomeState === 5 || demoHomeState === 6) && (
                    <div style={{ marginBottom: '12px', color: '#16a34a' }}>
                      <TrendingUp size={32} />
                    </div>
                  )}
                  <div style={{ fontSize: demoHomeState === 9 ? '1.8rem' : '2.5rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '8px', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                      {data.heroMain.includes(' ₫') ? (
                        <>
                          <span>{data.heroMain.replace(' ₫', '')}</span>
                          <span style={{ fontSize: demoHomeState === 9 ? '0.9rem' : '1rem', marginTop: demoHomeState === 9 ? '6px' : '8px', marginLeft: '4px', fontWeight: 700 }}>₫</span>
                        </>
                      ) : data.heroMain}
                    </div>
                    {demoHomeState === 9 && (
                      <div style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '0.85rem', fontWeight: 800, padding: '4px 10px', borderRadius: '100px', border: '1px solid #dcfce7' }}>
                        +12.4%
                      </div>
                    )}
                  </div>
                  {data.heroSub && <div style={{ fontSize: '0.9rem', color: '#555555', marginBottom: '24px', lineHeight: '1.4' }}>{data.heroSub}</div>}
                  {data.heroCTAs && data.heroCTAs.length > 0 && (
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                      {data.heroCTAs.map((cta, i) => (
                        <button
                          key={cta}
                          onClick={() => {
                            if (cta === "Xác thực để bắt đầu") {
                              setDemoHomeState(6);
                              setShowKYCPopup(true);
                            }
                          }}
                          style={{
                            flex: 1,
                            background: i === (data.heroCTAs.length - 1) ? '#1a1a1a' : '#f5f5f5',
                            color: i === (data.heroCTAs.length - 1) ? 'white' : '#1a1a1a',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                          }}
                        >
                          {cta}
                        </button>
                      ))}
                    </div>
                  )}

                  {demoHomeState === 9 && (
                    <>
                      <div style={{ height: '1px', background: '#e5e5e5', margin: '24px 0 20px', width: '100%' }}></div>
                      <div 
                        onClick={() => setShowPowerDetail(true)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#555555' }}>Sức mua</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a' }}>{data.purchasingPower}</span>
                          <ChevronRight size={18} color="#888888" />
                        </div>
                      </div>
                    </>
                  )}

                  {data.showFact && (
                    <>
                      <div style={{ height: '1px', background: '#e5e5e5', margin: '24px 0 20px', width: '100%' }}></div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#888888', marginBottom: '10px', lineHeight: '1.4' }}>{data.factLine}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a' }}>
                        <TrendingUp size={20} />
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>{data.factNumber}</div>
                      </div>
                    </>
                  )}
                </div>

                {showPowerDetail && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 500 }}>
                    <div 
                      onClick={() => setShowPowerDetail(false)} 
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 0.2s' }}
                    ></div>
                    <div style={{ 
                      position: 'absolute', 
                      left: 0, 
                      right: 0, 
                      bottom: 0, 
                      background: 'white', 
                      borderTopLeftRadius: '24px', 
                      borderTopRightRadius: '24px', 
                      padding: '32px 24px 48px', 
                      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }}>
                      <div style={{ width: '40px', height: '4px', background: '#e5e5e5', borderRadius: '2px', margin: '-16px auto 24px' }}></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a' }}>Chi tiết sức mua</h3>
                        <button onClick={() => setShowPowerDetail(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#1a1a1a" /></button>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                          { label: 'Tiền mặt', value: '0 ₫' },
                          { label: 'Hạn mức tín dụng', value: demoHomeState === 8 || demoHomeState === 9 ? '50.000.000 ₫' : '0 ₫' },
                          { label: 'Điểm Nexus', value: '100.000 ₫', highlight: true }
                        ].map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: idx < 2 ? '16px' : '0', borderBottom: idx < 2 ? '1px solid #f5f5f5' : 'none' }}>
                            <span style={{ fontSize: '0.95rem', color: '#555555', fontWeight: 500 }}>{item.label}</span>
                            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: item.highlight ? '#16a34a' : '#1a1a1a' }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        onClick={() => setShowPowerDetail(false)}
                        style={{ width: '100%', marginTop: '32px', padding: '18px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                )}

                {/* Section 4: Quick Actions Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px 24px' }}>
                  {[
                    { icon: Wallet, label: 'Nạp tiền', disabled: false },
                    { icon: TrendingUp, label: 'Đầu tư', disabled: data.actionsDisabled },
                    { icon: Target, label: 'Tích lũy', disabled: data.actionsDisabled },
                    { icon: ScanFace, label: 'Quét QR', disabled: data.actionsDisabled }
                  ].map((action, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: action.disabled ? 0.3 : 1, cursor: 'pointer' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a' }}>
                        <action.icon size={20} />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1a1a1a' }}>{action.label}</span>
                    </div>
                  ))}
                </div>

                {/* Section 5: Primary Content */}
                <div style={{ padding: '0 20px 24px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>{data.portfolioHeading}</h3>
                  <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #f0f0f0', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TrendingUp size={20} color="#16a34a" /></div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a' }}>{data.portfolioContent.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#888888', marginTop: '2px' }}>{data.portfolioContent.sub}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: data.portfolioContent.value.startsWith('+') ? '#16a34a' : '#1a1a1a' }}>{data.portfolioContent.value}</div>
                  </div>
                </div>

                {/* Section 6: Secondary Content */}
                <div style={{ padding: '0 20px 24px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>Mục tiêu của bạn</h3>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
                    {[
                      { title: "Đổi iPhone mới", icon: Smartphone, color: "#1a1a1a", progress: 65 },
                      { title: "Du lịch Thái Lan", icon: Compass, color: "#1a1a1a", progress: 30 }
                    ].map((goal, i) => (
                      <div key={i} style={{ minWidth: '200px', background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <goal.icon size={18} color="#1a1a1a" />
                          </div>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888888' }}>{goal.progress}%</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>{goal.title}</div>
                        <div style={{ height: '6px', background: '#f5f5f5', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${goal.progress}%`, height: '100%', background: '#1a1a1a', borderRadius: '3px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 7: Discovery Feed */}
                <div style={{ padding: '0 20px 40px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '16px' }}>Khám phá</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { title: "Thị trường bùng nổ: VN-Index vượt 1300 điểm", time: "2 giờ trước", icon: BarChart2 },
                      { title: "Top 5 mã cổ phiếu đáng chú ý tuần này", time: "5 giờ trước", icon: Zap },
                      { title: "Chiến lược đầu tư cho người mới bắt đầu", time: "1 ngày trước", icon: GraduationCap }
                    ].map((news, i) => (
                      <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', flexShrink: 0 }}>
                          <news.icon size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a1a', lineHeight: '1.4', marginBottom: '2px' }}>{news.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#888888' }}>{news.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 8: Bottom Navigation */}
              <div style={{ background: '#ffffff', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px 24px', flexShrink: 0 }}>
                {[
                  { icon: Home, label: 'Trang chủ', active: true },
                  { icon: Wallet, label: 'Tài sản', active: false },
                  { icon: Compass, label: 'Sống khác', active: false },
                  { icon: Target, label: 'Mục tiêu', active: false },
                  { icon: History, label: 'Lịch sử', active: false }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: item.active ? '#1a1a1a' : '#888888', cursor: 'pointer' }}>
                    <item.icon size={20} color={item.active ? '#1a1a1a' : '#888888'} />
                    <span style={{ fontSize: '0.65rem', fontWeight: item.active ? 600 : 500 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        };

        return renderDemoHome(demoHomeState);

      case 'interaction':
        return (
          <div className="demo-screen">
            <h2 className="demo-title">Giao dịch Thông minh</h2>
            <p className="demo-subtitle">Các thao tác vuốt, chạm được tối ưu hóa. Phản hồi mượt mà và trực quan.</p>
            <div className="demo-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#333333' }}></div>
              <div style={{ flex: 1 }}>
                <div className="demo-skeleton w-3-4"></div>
                <div className="demo-skeleton w-1-2"></div>
              </div>
            </div>
            <div className="demo-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0e0e0' }}></div>
              <div style={{ flex: 1 }}>
                <div className="demo-skeleton w-3-4"></div>
                <div className="demo-skeleton w-1-2"></div>
              </div>
            </div>
            <button className="demo-button" style={{ background: '#1a1a1a' }}>Xác nhận Giao dịch</button>
          </div>
        );

      case 'design-style':
        const app = galleryApps[selectedGalleryApp];
        if (app && app.sections && app.sections[currentGallerySectionIndex].images.length > 0) {
          return (
            <div className="demo-screen" style={{ padding: 0, height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={app.sections[currentGallerySectionIndex].images[currentGalleryImageIndex]} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: activeTab === 'design-style' ? 'flex-end' : 'center', paddingRight: activeTab === 'design-style' ? '80px' : '0', height: '100%', width: '100%' }}>
      {activeTab === 'design-style' && (
        <>
          <div style={{ position: 'absolute', top: '0', left: '0', display: 'flex', flexDirection: 'row', gap: '32px', height: '100%', zIndex: 10, paddingBottom: '24px' }}>

            {/* Column 1: Gallery */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '320px', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#333333', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Thư viện thiết kế</h3>
              {Object.values(galleryApps).map(app => (
                <div
                  key={app.id}
                  onClick={() => { setSelectedGalleryApp(app.id); setCurrentGallerySectionIndex(0); setCurrentGalleryImageIndex(0); }}
                  style={{
                    background: selectedGalleryApp === app.id ? '#ffffff' : 'transparent',
                    border: selectedGalleryApp === app.id ? '1px solid #e5e5e5' : '1px solid transparent',
                    borderRadius: '16px',
                    padding: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedGalleryApp === app.id ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                  }}
                  onMouseOver={(e) => { if (selectedGalleryApp !== app.id) e.currentTarget.style.background = '#f5f5f5'; }}
                  onMouseOut={(e) => { if (selectedGalleryApp !== app.id) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <img src={app.sections && app.sections[0] ? app.sections[0].images[0] : ''} alt={app.title} style={{ width: '60px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #f0f0f0' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{app.title}</h4>
                      <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4', marginBottom: '8px' }}>{app.description}</p>
                      <div style={{ display: 'inline-flex', alignItems: 'center', background: '#f5f5f5', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#555555' }}>
                        {app.sections ? app.sections.reduce((acc, sec) => acc + sec.images.length, 0) : 0} ảnh
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: TOC */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#333333', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Luồng tính năng</h3>
              {selectedGalleryApp && galleryApps[selectedGalleryApp].sections && galleryApps[selectedGalleryApp].sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentGallerySectionIndex(idx); setCurrentGalleryImageIndex(0); }}
                  className={`toc-btn ${currentGallerySectionIndex === idx ? 'active' : ''}`}
                >
                  {section.name}
                </button>
              ))}
            </div>

          </div>
        </>
      )}

      {showKYCPopup && (kycStep === 'vneid_waiting' || (kycStep === 'liveness' && livenessStep === 'camera')) && (
        <div style={{ position: 'absolute', top: '50%', right: '40px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', animation: 'fadeIn 0.3s' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#888888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>User Action</span>
          <button
            onClick={() => {
              if (kycStep === 'vneid_waiting') {
                setKycStep('liveness');
                setLivenessStep('ready');
              } else if (kycStep === 'liveness') {
                setLivenessStep('success');
              }
            }}
            style={{
              background: '#ffffff',
              color: '#ff5a00',
              border: '1px solid #e5e5e5',
              borderRadius: '12px',
              padding: '12px 20px',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.08)'; }}
            onMouseOut={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)'; }}
          >
            {kycStep === 'vneid_waiting' ? 'Hoàn thành chia sẻ' : 'Hoàn thành liveness check'}
          </button>
        </div>
      )}

      <div className="mobile-frame-container" style={{ height: activeTab === 'design-style' ? '780px' : undefined }}>
        {activeTab === 'time-to-value' && (
          <div style={{ position: 'absolute', top: '0', left: '-320px', width: '280px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#333333', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Luồng tính năng</h3>
            {[
              { id: 0, label: "Giới thiệu" },
              { id: 5, label: "Home: Chưa xác thực" },
              { id: 6, label: "eKYC" },
              { id: 7, label: "Home: Chưa liên kết bank" },
              { id: 8, label: "Home: Đã liên kết bank" },
              { id: 9, label: "Home: Đang đầu tư" }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDemoHomeState(item.id);
                  if (item.id === 6) {
                    setShowKYCPopup(true);
                  } else if (item.id === 5) {
                    setShowKYCPopup(false);
                  }
                }}
                className={`toc-btn ${demoHomeState === item.id ? 'active' : ''}`}
              >
                {`${idx + 1}. ${item.label}`}
              </button>
            ))}
          </div>
        )}
        {/* Navigation Arrows for Gallery */}
        {activeTab === 'design-style' && selectedGalleryApp && galleryApps[selectedGalleryApp].sections && galleryApps[selectedGalleryApp].sections[currentGallerySectionIndex].images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentGalleryImageIndex(prev => prev > 0 ? prev - 1 : galleryApps[selectedGalleryApp].sections[currentGallerySectionIndex].images.length - 1)}
              style={{ position: 'absolute', top: '50%', left: '-80px', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'white', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', zIndex: 100 }}
            >
              <ArrowLeft size={24} color="#1a1a1a" />
            </button>
            <button
              onClick={() => setCurrentGalleryImageIndex(prev => prev < galleryApps[selectedGalleryApp].sections[currentGallerySectionIndex].images.length - 1 ? prev + 1 : 0)}
              style={{ position: 'absolute', top: '50%', right: '-80px', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'white', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', zIndex: 100 }}
            >
              <ArrowRight size={24} color="#1a1a1a" />
            </button>
          </>
        )}
        <div className="mobile-screen">
          {renderContent()}

          {/* Passkey Bottom Sheet */}
          {showPasskeyPopup && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
              <div
                onClick={() => { setShowPasskeyPopup(false); setDemoHomeState(4); }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 0.3s' }}
              ></div>
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                background: 'white',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '32px 24px 48px',
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'center'
              }}>
                <div style={{ width: '40px', height: '4px', background: '#e5e5e5', borderRadius: '2px', margin: '-16px auto 24px' }}></div>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#1a1a1a' }}>
                  <Fingerprint size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Đăng nhập nhanh hơn với Passkey</h3>
                <p style={{ fontSize: '0.95rem', color: '#555555', lineHeight: '1.5', marginBottom: '32px' }}>
                  Dùng Face ID hoặc vân tay để mở app — không cần nhớ mật khẩu
                </p>
                <button
                  onClick={() => { setShowPasskeyPopup(false); setDemoHomeState(4); }}
                  style={{ width: '100%', padding: '18px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '12px' }}
                >
                  Bật Passkey ngay
                </button>
                <button
                  onClick={() => { setShowPasskeyPopup(false); setDemoHomeState(4); }}
                  style={{ width: '100%', background: 'none', border: 'none', color: '#888888', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', padding: '12px' }}
                >
                  Để sau
                </button>
              </div>
            </div>
          )}

          {showKYCPopup && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#ffffff',
                zIndex: 100,
                animation: isClosingKYC ? 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ paddingTop: '24px', paddingBottom: '0', borderBottom: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#1a1a1a' }}>
                    {kycStep === 'selection' && 'Xác thực tài khoản'}
                    {kycStep === 'vneid_handoff' && 'Kết nối VNEID'}
                    {kycStep === 'vneid_waiting' && 'Đang xử lý...'}
                    {kycStep === 'vneid_fallback' && 'Kết nối VNEID'}
                    {kycStep === 'liveness' && livenessStep === 'ready' && 'Chụp ảnh chân dung'}
                    {kycStep === 'liveness' && livenessStep === 'camera' && 'Xác thực khuôn mặt'}
                    {kycStep === 'liveness' && livenessStep === 'success' && 'Hoàn tất'}
                    {kycStep === 'review_info' && 'Xác nhận thông tin'}
                  </div>
                  <button onClick={() => {
                    if (kycStep === 'vneid_handoff' || kycStep === 'liveness' || kycStep === 'review_info' || kycStep === 'vneid_fallback') {
                      setKycStep('selection');
                    } else {
                      handleCloseKYC();
                    }
                  }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    {(kycStep === 'vneid_handoff' || kycStep === 'liveness' || kycStep === 'review_info' || kycStep === 'vneid_fallback') ? <ArrowLeft size={24} color="#1a1a1a" /> : <X size={24} color="#1a1a1a" />}
                  </button>
                </div>
                <div style={{ width: '100%', height: '4px', background: '#f0f0f0' }}>
                  <div style={{ width: '50%', height: '100%', background: '#333333' }}></div>
                </div>
              </div>

              {kycStep === 'selection' && (
                <>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.3', color: '#1a1a1a' }}>
                      Xác thực danh tính của bạn
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                      Theo quy định của Ngân hàng Nhà nước, Nexus cần xác thực danh tính trước khi bạn có thể nạp tiền và đầu tư. Mất khoảng 2 phút.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div
                        onClick={() => setSelectedKYCMethod('vneid')}
                        style={{
                          border: `2px solid ${selectedKYCMethod === 'vneid' ? '#333333' : '#e5e5e5'}`,
                          borderRadius: '16px',
                          padding: '20px',
                          cursor: 'pointer',
                          background: selectedKYCMethod === 'vneid' ? '#fcfcfc' : 'white',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                      >
                        <div style={{ position: 'absolute', top: '-12px', right: '16px', background: '#333333', color: 'white', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                          Nhanh nhất
                        </div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>Kết nối với VNEID</h3>
                        <p style={{ fontSize: '0.9rem', color: '#555555', marginBottom: '12px', lineHeight: '1.4' }}>
                          Dùng tài khoản định danh điện tử mức 2. Thông tin được xác thực sẵn bởi Bộ Công an.
                        </p>
                        <div style={{ fontSize: '0.8rem', color: '#888888', fontWeight: 500 }}>
                          ~2 phút · Không cần chụp giấy tờ
                        </div>
                      </div>

                      <div
                        onClick={() => setSelectedKYCMethod('manual')}
                        style={{
                          border: `2px solid ${selectedKYCMethod === 'manual' ? '#333333' : '#e5e5e5'}`,
                          borderRadius: '16px',
                          padding: '20px',
                          cursor: 'pointer',
                          background: selectedKYCMethod === 'manual' ? '#fcfcfc' : 'white',
                          transition: 'all 0.2s'
                        }}
                      >
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>Tải lên hồ sơ</h3>
                        <p style={{ fontSize: '0.9rem', color: '#555555', marginBottom: '12px', lineHeight: '1.4' }}>
                          Chụp CCCD và ảnh chân dung. Dành cho người chưa có VNEID mức 2.
                        </p>
                        <div style={{ fontSize: '0.8rem', color: '#888888', fontWeight: 500 }}>
                          ~5 phút
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '20px', borderTop: '1px solid #e5e5e5', background: '#ffffff', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#888888', fontSize: '0.75rem', fontWeight: 500, marginBottom: '16px' }}>
                      <Shield size={14} />
                      <span>Thông tin của bạn được mã hóa và chỉ dùng để xác thực tài khoản.</span>
                    </div>
                    <button
                      disabled={!selectedKYCMethod}
                      onClick={() => {
                        if (selectedKYCMethod === 'vneid') {
                          setKycStep('vneid_handoff');
                        } else {
                          alert(`Bắt đầu xác thực bằng: ${selectedKYCMethod}`);
                        }
                      }}
                      style={{
                        width: '100%',
                        fontSize: '1.125rem',
                        padding: '18px',
                        background: selectedKYCMethod ? '#333333' : '#e5e5e5',
                        color: selectedKYCMethod ? 'white' : '#888888',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        cursor: selectedKYCMethod ? 'pointer' : 'not-allowed',
                        boxShadow: selectedKYCMethod ? '0 8px 16px rgba(0, 0, 0, 0.1)' : 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      Tiếp tục
                    </button>
                  </div>
                </>
              )}

              {kycStep === 'vneid_handoff' && (
                <>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.3', color: '#1a1a1a' }}>
                      Sẵn sàng kết nối VNEID
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: '24px', lineHeight: '1.5' }}>
                      Nexus sẽ chuyển bạn sang app VNEID để xác nhận chia sẻ thông tin. Cụ thể như sau:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a1a1a', flexShrink: 0 }}>1</div>
                        <div>
                          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '6px' }}><Smartphone size={16} /> Chuyển sang VNEID</h4>
                          <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4' }}>Bạn xác nhận đăng nhập trong app VNEID.</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a1a1a', flexShrink: 0 }}>2</div>
                        <div>
                          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '6px' }}><Share2 size={16} /> Chia sẻ thông tin</h4>
                          <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4' }}>Bạn xem và đồng ý chia sẻ thông tin định danh sang Nexus.</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a1a1a', flexShrink: 0 }}>3</div>
                        <div>
                          <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '6px' }}><RefreshCcw size={16} /> Quay lại Nexus</h4>
                          <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4' }}>App tự động mở lại để hoàn tất xác thực.</p>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: '#f9f9f9', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4', fontWeight: 500 }}>
                        <strong style={{ color: '#1a1a1a' }}>Yêu cầu:</strong> Đảm bảo app VNEID đã được cài và bạn đã kích hoạt định danh mức 2.
                      </p>
                    </div>

                    <div
                      onClick={() => setShowInfoSheet(true)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#333333', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      <Info size={16} /> Nexus nhận những thông tin gì?
                    </div>
                  </div>

                  <div style={{ padding: '20px', borderTop: '1px solid #e5e5e5', background: '#ffffff', flexShrink: 0 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={vneidConsent}
                        onChange={(e) => setVneidConsent(e.target.checked)}
                        style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#333333' }}
                      />
                      <span style={{ fontSize: '0.8rem', color: '#555555', lineHeight: '1.4' }}>
                        Tôi đồng ý cho Nexus tiếp nhận thông tin định danh từ VNEID để mở tài khoản dịch vụ tài chính theo Điều khoản sử dụng.
                      </span>
                    </label>

                    <button
                      disabled={!vneidConsent}
                      onClick={() => setKycStep('vneid_waiting')}
                      style={{
                        width: '100%',
                        fontSize: '1.1rem',
                        padding: '16px',
                        background: vneidConsent ? '#333333' : '#e5e5e5',
                        color: vneidConsent ? 'white' : '#888888',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        cursor: vneidConsent ? 'pointer' : 'not-allowed',
                        boxShadow: vneidConsent ? '0 8px 16px rgba(0, 0, 0, 0.1)' : 'none',
                        marginBottom: '12px',
                        transition: 'all 0.2s'
                      }}
                    >
                      Mở app VNEID
                    </button>
                    <div
                      onClick={() => setKycStep('vneid_fallback')}
                      style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555555', fontWeight: 600, cursor: 'pointer', padding: '8px' }}
                    >
                      Tôi chưa có VNEID mức 2
                    </div>
                  </div>
                </>
              )}

              {kycStep === 'vneid_waiting' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', textAlign: 'center' }}>
                  <div style={{ marginBottom: '32px' }}>
                    <Loader2 size={64} color="#1a1a1a" style={{ animation: 'spin 1.5s linear infinite' }} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', lineHeight: '1.3', color: '#1a1a1a' }}>
                    Đang chờ xác nhận từ VNEID...
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                    Vui lòng hoàn tất bước chia sẻ thông tin trong app VNEID. Nexus sẽ tự động cập nhật khi xong.
                  </p>
                  <div style={{ fontSize: '0.85rem', color: '#888888', marginBottom: 'auto', fontStyle: 'italic' }}>
                    Bạn có thể quay lại app VNEID nếu lỡ thoát.
                  </div>

                  <div style={{ width: '100%', marginTop: '32px' }}>
                    <button
                      style={{
                        width: '100%',
                        fontSize: '1.1rem',
                        padding: '16px',
                        background: '#333333',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        marginBottom: '16px',
                        transition: 'all 0.2s'
                      }}
                    >
                      Mở lại VNEID
                    </button>
                    <div
                      onClick={() => setKycStep('selection')}
                      style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555555', fontWeight: 600, cursor: 'pointer', padding: '8px', textDecoration: 'underline' }}
                    >
                      Hủy và chọn cách khác
                    </div>
                  </div>
                </div>
              )}

              {kycStep === 'liveness' && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 20px', background: livenessStep === 'camera' ? '#1a1a1a' : '#ffffff' }}>
                  {livenessStep === 'ready' && (
                    <>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.3', color: '#1a1a1a' }}>
                        Chụp ảnh chân dung
                      </h2>
                      <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                        Bước cuối: chụp một ảnh selfie để xác nhận chính bạn đang mở tài khoản.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: 'auto' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', flexShrink: 0 }}><Sun size={20} /></div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a' }}>Đứng nơi đủ ánh sáng</div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', flexShrink: 0 }}><UserX size={20} /></div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a' }}>Bỏ kính, mũ, khẩu trang</div>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1a1a', flexShrink: 0 }}><ScanFace size={20} /></div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a' }}>Giữ khuôn mặt trong khung tròn</div>
                        </div>
                      </div>

                      <div style={{ marginTop: '32px' }}>
                        <button
                          onClick={() => {
                            setLivenessStep('camera');
                            setCameraPhase('position');
                          }}
                          style={{ width: '100%', fontSize: '1.1rem', padding: '16px', background: '#333333', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                        >
                          Bắt đầu chụp
                        </button>
                      </div>
                    </>
                  )}

                  {livenessStep === 'camera' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: '1rem', fontWeight: 600, zIndex: 10 }}>
                        {cameraPhase === 'position' && 'Đưa khuôn mặt vào khung'}
                        {cameraPhase === 'detecting' && 'Giữ yên và chớp mắt nhẹ'}
                        {cameraPhase === 'verifying' && 'Đang xác minh...'}
                      </div>

                      <div style={{ position: 'relative', width: '280px', height: '280px', borderRadius: '50%', border: `4px solid ${cameraPhase === 'verifying' ? '#e5e5e5' : '#ffffff'}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#333333', boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)' }}>
                        {cameraPhase === 'verifying' ? (
                          <Loader2 size={64} color="white" style={{ animation: 'spin 1.5s linear infinite' }} />
                        ) : (
                          <ScanFace size={120} color="rgba(255,255,255,0.2)" />
                        )}
                      </div>
                    </div>
                  )}

                  {livenessStep === 'success' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <div style={{ marginBottom: '24px' }}>
                        <CheckCircle2 size={80} color="#333333" />
                      </div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.3', color: '#1a1a1a' }}>
                        Đã xác minh khuôn mặt
                      </h2>
                      <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: 'auto', lineHeight: '1.5' }}>
                        Khuôn mặt khớp với CCCD trong VNEID.
                      </p>
                      <div style={{ width: '100%', marginTop: '32px' }}>
                        <button
                          onClick={() => setKycStep('review_info')}
                          style={{ width: '100%', fontSize: '1.1rem', padding: '16px', background: '#333333', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
                        >
                          Tiếp tục
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {kycStep === 'review_info' && (
                <>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', background: '#fcfcfc' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: '1.3', color: '#1a1a1a', marginBottom: '8px' }}>
                        Thông tin của bạn
                      </h2>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#ecfdf5', padding: '4px 8px', borderRadius: '12px', border: '1px solid #10b981' }}>
                        <ShieldCheck size={12} color="#10b981" />
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Xác thực bởi Bộ Công an</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                      Lấy từ CCCD qua VNEID. Nếu có sai sót, bạn cần cập nhật trực tiếp trên app VNEID.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                      {[
                        { label: 'Họ và tên', value: 'NGUYỄN VĂN AN' },
                        { label: 'Số CCCD', value: '001 *** *** 234' },
                        { label: 'Ngày sinh', value: '15/05/1998' },
                        { label: 'Giới tính', value: 'Nam' },
                        { label: 'Quê quán', value: 'Hà Nội' },
                        { label: 'Nơi thường trú', value: '123 Đường ABC, Quận Hai Bà Trưng, Hà Nội' },
                      ].map((field, idx) => (
                        <div key={idx}>
                          <label style={{ display: 'block', fontSize: '0.8rem', color: '#888888', fontWeight: 600, marginBottom: '6px' }}>{field.label}</label>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f5f5f5', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '14px 16px' }}>
                            <span style={{ fontSize: '0.95rem', color: '#1a1a1a', fontWeight: 600 }}>{field.value}</span>
                            <Lock size={16} color="#aaaaaa" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: '20px', borderTop: '1px solid #e5e5e5', background: '#ffffff', flexShrink: 0 }}>
                    <button
                      onClick={() => setShowPasskeyPopup(true)}
                      style={{ width: '100%', fontSize: '1.1rem', padding: '16px', background: '#333333', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', marginBottom: '12px' }}
                    >
                      Xác nhận
                    </button>
                    <div
                      onClick={() => setShowErrorSheet(true)}
                      style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555555', fontWeight: 600, cursor: 'pointer', padding: '8px', textDecoration: 'underline' }}
                    >
                      Thông tin không chính xác
                    </div>
                  </div>
                </>
              )}

              {kycStep === 'survey' && (
                <>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px', background: '#ffffff' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px', lineHeight: '1.2', color: '#1a1a1a' }}>
                      Mục tiêu tài chính của bạn là gì?
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: '32px', lineHeight: '1.5' }}>
                      Chọn một hoặc nhiều. Nexus sẽ gợi ý những gì phù hợp nhất với bạn.
                    </p>

                    {[
                      {
                        label: 'Tích lũy & an toàn',
                        options: ['Xây quỹ khẩn cấp', 'Mua nhà', 'Cưới hỏi', 'Du lịch', 'Tích lũy dài hạn']
                      },
                      {
                        label: 'Đầu tư & sinh lời',
                        options: ['Có thu nhập thụ động', 'Thử đầu tư lần đầu', 'Tối ưu tiền nhàn rỗi', 'Đầu tư dài hạn']
                      },
                      {
                        label: 'Chi tiêu hàng ngày',
                        options: ['Thanh toán nhanh hơn', 'Kiểm soát ngân sách', 'Chi tiêu thông minh hơn']
                      }
                    ].map((group, gIdx) => (
                      <div key={gIdx} style={{ marginBottom: '32px' }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>
                          {group.label}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {group.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              style={{
                                padding: '10px 18px',
                                borderRadius: '24px',
                                border: '1px solid #e5e5e5',
                                background: 'white',
                                color: '#1a1a1a',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onClick={(e) => {
                                const btn = e.currentTarget;
                                const isSelected = btn.style.background === 'rgb(26, 26, 26)';
                                if (isSelected) {
                                  btn.style.background = 'white';
                                  btn.style.color = '#1a1a1a';
                                  btn.style.borderColor = '#e5e5e5';
                                } else {
                                  btn.style.background = '#1a1a1a';
                                  btn.style.color = 'white';
                                  btn.style.borderColor = '#1a1a1a';
                                }
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '24px 24px 40px', borderTop: '1px solid #f0f0f0', background: 'white', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: '#aaaaaa', marginBottom: '16px' }}>
                      Bạn có thể thay đổi sau trong mục Cài đặt.
                    </p>
                    <button
                      onClick={() => handleCloseKYC()}
                      style={{ width: '100%', padding: '18px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '16px' }}
                    >
                      Tiếp tục
                    </button>
                    <button
                      onClick={() => handleCloseKYC()}
                      style={{ background: 'none', border: 'none', color: '#555555', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Bỏ qua
                    </button>
                  </div>
                </>
              )}

              {kycStep === 'vneid_fallback' && (
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', background: '#fcfcfc', display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', lineHeight: '1.3', color: '#1a1a1a' }}>
                    Bạn cần định danh mức 2 trên VNEID
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: '#555555', marginBottom: '24px', lineHeight: '1.5' }}>
                    Định danh mức 2 là tài khoản đã được xác thực trực tiếp tại Công an phường/xã. Đây là yêu cầu bắt buộc theo quy định mở tài khoản tài chính.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 'auto' }}>
                    <div style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <ShieldCheck size={20} color="#1a1a1a" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: '#1a1a1a' }}>Nâng cấp VNEID lên mức 2</h3>
                          <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4', marginBottom: '16px' }}>Đến Công an phường/xã gần nhất, mang theo CCCD gắn chip. Mất khoảng 15 phút.</p>
                          <div style={{ color: '#1a1a1a', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', textDecoration: 'underline' }}>
                            Xem hướng dẫn chi tiết <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ background: 'white', border: '1px solid #e5e5e5', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FileText size={20} color="#1a1a1a" />
                        </div>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px', color: '#1a1a1a' }}>Tải hồ sơ thay thế</h3>
                          <p style={{ fontSize: '0.85rem', color: '#555555', lineHeight: '1.4', marginBottom: '16px' }}>Chụp ảnh CCCD và chân dung. Nexus duyệt thủ công trong 1–2 ngày làm việc.</p>
                          <button
                            onClick={() => alert("Chuyển sang flow tải hồ sơ thủ công")}
                            style={{ background: '#333333', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 16px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                          >
                            Chuyển sang tải hồ sơ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setKycStep('selection')}
                    style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#555555', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Quay lại bước chọn phương thức
                  </div>
                </div>
              )}

              {showInfoSheet && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: 'flex', flexDirection: 'column' }}>
                  <div onClick={() => setShowInfoSheet(false)} style={{ flex: 1, background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 0.2s' }}></div>
                  <div style={{ background: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', maxHeight: '80%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a1a' }}>Thông tin Nexus sẽ nhận từ VNEID</h3>
                      <button onClick={() => setShowInfoSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="#1a1a1a" />
                      </button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          'Họ và tên',
                          'Số CCCD',
                          'Ngày sinh và giới tính',
                          'Quê quán và nơi thường trú',
                          'Ảnh chân dung từ CCCD'
                        ].map((item, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', color: '#333333' }}>
                            <CheckCircle2 size={18} color="#1a1a1a" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e5e5e5', fontSize: '0.8rem', color: '#888888', lineHeight: '1.4' }}>
                      Nexus không truy cập các thông tin khác trong VNEID. Bạn có thể thu hồi quyền chia sẻ bất kỳ lúc nào trong app VNEID.
                    </div>
                  </div>
                </div>
              )}

              {showErrorSheet && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 200, display: 'flex', flexDirection: 'column' }}>
                  <div onClick={() => setShowErrorSheet(false)} style={{ flex: 1, background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 0.2s' }}></div>
                  <div style={{ background: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '24px', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', maxHeight: '80%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a1a' }}>Cập nhật thông tin</h3>
                      <button onClick={() => setShowErrorSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="#1a1a1a" />
                      </button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.95rem', color: '#555555', lineHeight: '1.5' }}>
                      Nếu thông tin hiển thị không chính xác, vui lòng thực hiện các bước sau:
                      <ol style={{ paddingLeft: '20px', marginTop: '12px', marginBottom: '0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>Mở ứng dụng <strong>VNEID</strong> trên thiết bị của bạn.</li>
                        <li>Vào phần thông tin cá nhân và yêu cầu cập nhật.</li>
                        <li>Sau khi thông tin được Bộ Công an phê duyệt, quay lại Nexus để xác thực lại.</li>
                      </ol>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                      <button
                        onClick={() => setShowErrorSheet(false)}
                        style={{ width: '100%', fontSize: '1.05rem', padding: '14px', background: '#e5e5e5', color: '#1a1a1a', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Passkey Bottom Sheet - Layered above KYC */}
          {showPasskeyPopup && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
              <div
                onClick={() => { setShowPasskeyPopup(false); setKycStep('survey'); }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', animation: 'fadeIn 0.3s' }}
              ></div>
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                background: 'white',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                padding: '32px 24px 48px',
                animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'center'
              }}>
                <div style={{ width: '40px', height: '4px', background: '#e5e5e5', borderRadius: '2px', margin: '-16px auto 24px' }}></div>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#1a1a1a' }}>
                  <Fingerprint size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '12px' }}>Đăng nhập nhanh hơn với Passkey</h3>
                <p style={{ fontSize: '0.95rem', color: '#555555', lineHeight: '1.5', marginBottom: '32px' }}>
                  Dùng Face ID hoặc vân tay để mở app — không cần nhớ mật khẩu
                </p>
                <button
                  onClick={() => { setShowPasskeyPopup(false); setKycStep('survey'); }}
                  style={{ width: '100%', padding: '18px', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '12px' }}
                >
                  Bật Passkey ngay
                </button>
                <button
                  onClick={() => { setShowPasskeyPopup(false); setKycStep('survey'); }}
                  style={{ width: '100%', background: 'none', border: 'none', color: '#888888', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', padding: '12px' }}
                >
                  Để sau
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
