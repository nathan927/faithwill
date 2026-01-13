import { useState } from "react";
import { VehicleType } from "@/types/game";
import { VehicleSelector } from "@/components/VehicleSelector";
import { GameCard } from "@/components/GameCard";
import { JumpRunner } from "@/components/games/JumpRunner";
import { TrafficLightChallenge } from "@/components/games/TrafficLightChallenge";
import { CoinCollector } from "@/components/games/CoinCollector";
import { DrivingSimulator } from "@/components/games/DrivingSimulator";
import { Button } from "@/components/ui/button";
import cityBg from "@/assets/city-bg.png";

type GameType = 'jump-runner' | 'traffic-light' | 'coin-collector' | 'driving-simulator' | null;

const Index = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [currentGame, setCurrentGame] = useState<GameType>(null);

  const handleBackToMenu = () => {
    setCurrentGame(null);
  };

  const handleBackToVehicleSelect = () => {
    setSelectedVehicle(null);
    setCurrentGame(null);
  };

  // Render current game
  if (currentGame && selectedVehicle) {
    return (
      <div 
        className="min-h-screen py-8 px-4"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)))`,
        }}
      >
        <div className="container max-w-4xl mx-auto">
          <Button 
            onClick={handleBackToMenu}
            variant="ghost"
            className="mb-4 text-lg"
          >
            ← 返回遊戲選單
          </Button>
          
          {currentGame === 'jump-runner' && (
            <JumpRunner vehicle={selectedVehicle} onBack={handleBackToMenu} />
          )}
          {currentGame === 'traffic-light' && (
            <TrafficLightChallenge vehicle={selectedVehicle} onBack={handleBackToMenu} />
          )}
          {currentGame === 'coin-collector' && (
            <CoinCollector vehicle={selectedVehicle} onBack={handleBackToMenu} />
          )}
          {currentGame === 'driving-simulator' && (
            <DrivingSimulator vehicle={selectedVehicle} onBack={handleBackToMenu} />
          )}
        </div>
      </div>
    );
  }

  // Render game selection
  if (selectedVehicle) {
    return (
      <div 
        className="min-h-screen py-8 px-4"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)))`,
        }}
      >
        <div className="container max-w-4xl mx-auto">
          <Button 
            onClick={handleBackToVehicleSelect}
            variant="ghost"
            className="mb-4 text-lg"
          >
            ← 返回選擇車輛
          </Button>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              🎮 選擇遊戲 🎮
            </h1>
            <p className="text-lg text-muted-foreground">選擇你想玩的遊戲！</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            <GameCard 
              title="送客快車"
              description="跳過障礙物，把乘客安全送到終點站！"
              icon="🚗"
              color="bg-primary"
              onClick={() => setCurrentGame('jump-runner')}
            />
            <GameCard 
              title="交通燈挑戰"
              description="看準交通燈，做個守規則的好司機！"
              icon="🚦"
              color="bg-secondary"
              onClick={() => setCurrentGame('traffic-light')}
            />
            <GameCard 
              title="金幣收集"
              description="駕駛車輛收集金幣，避開障礙物！"
              icon="🪙"
              color="bg-accent"
              onClick={() => setCurrentGame('coin-collector')}
            />
            <GameCard 
              title="模擬駕駛"
              description="控制車輛穿越隧道、天橋，完成駕駛挑戰！"
              icon="🏎️"
              color="bg-game-road"
              onClick={() => setCurrentGame('driving-simulator')}
            />
          </div>
        </div>
      </div>
    );
  }

  // Render vehicle selection (home page)
  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundImage: `linear-gradient(to bottom, hsl(var(--background)), hsl(var(--muted)))`,
      }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `url(${cityBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom'
          }}
        />
        <div className="relative container max-w-4xl mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            🚗 香港車車遊樂園 🚌
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 animate-fade-in">
            歡迎來到香港交通工具遊戲！
          </p>
          <p className="text-lg text-muted-foreground animate-fade-in">
            選擇你最喜歡的交通工具開始遊戲吧！
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="text-3xl bounce-continuous">🚕</span>
            <span className="text-3xl bounce-continuous" style={{ animationDelay: '0.2s' }}>🚌</span>
            <span className="text-3xl bounce-continuous" style={{ animationDelay: '0.4s' }}>🚃</span>
            <span className="text-3xl bounce-continuous" style={{ animationDelay: '0.6s' }}>🚐</span>
          </div>
        </div>
      </div>

      {/* Vehicle Selection */}
      <div className="container max-w-4xl mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            ✨ 選擇你的座駕 ✨
          </h2>
          <p className="text-muted-foreground">點擊選擇你最喜歡的香港交通工具！</p>
        </div>

        <VehicleSelector 
          selectedVehicle={selectedVehicle}
          onSelect={setSelectedVehicle}
        />

        {selectedVehicle && (
          <div className="mt-8 text-center animate-scale-in">
            <Button 
              onClick={() => {}}
              className="btn-bounce bg-primary text-primary-foreground text-xl py-6 px-12"
            >
              🎮 開始遊戲！
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            🚗 香港車車遊樂園 - 專為香港小朋友設計 🎮
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            適合 6 歲以上小朋友遊玩
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
