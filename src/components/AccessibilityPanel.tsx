import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Type, 
  Contrast, 
  Volume2, 
  VolumeX, 
  MousePointer2, 
  Keyboard, 
  Monitor,
  Settings,
  RotateCcw,
  Check,
  Zap,
  Sun,
  Moon,
  Minus,
  Plus
} from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNav: boolean;
  focusIndicator: boolean;
  colorBlindFriendly: boolean;
  textSpacing: number;
  fontSize: number;
  soundEnabled: boolean;
  darkMode: boolean;
}

interface AccessibilityProps {
  isVisible: boolean;
  onClose: () => void;
  onSettingsChange: (settings: AccessibilitySettings) => void;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
  keyboardNav: true,
  focusIndicator: true,
  colorBlindFriendly: false,
  textSpacing: 1,
  fontSize: 16,
  soundEnabled: true,
  darkMode: false
};

export default function AccessibilityPanel({ isVisible, onClose, onSettingsChange }: AccessibilityProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'visual' | 'motor' | 'cognitive' | 'audio'>('visual');

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('opensoftware_accessibility');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);

  // Save settings and apply changes
  useEffect(() => {
    localStorage.setItem('opensoftware_accessibility', JSON.stringify(settings));
    onSettingsChange(settings);
    applyAccessibilitySettings(settings);
  }, [settings, onSettingsChange]);

  const applyAccessibilitySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // High contrast
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Color blind friendly
    if (newSettings.colorBlindFriendly) {
      root.classList.add('color-blind-friendly');
    } else {
      root.classList.remove('color-blind-friendly');
    }

    // Enhanced focus
    if (newSettings.focusIndicator) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // Font size
    root.style.setProperty('--base-font-size', `${newSettings.fontSize}px`);

    // Text spacing
    root.style.setProperty('--text-spacing', `${newSettings.textSpacing}`);

    // Dark mode
    if (newSettings.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    label, 
    description 
  }: { 
    checked: boolean; 
    onChange: (checked: boolean) => void;
    label: string;
    description: string;
  }) => (
    <div className="flex items-start justify-between py-3">
      <div className="flex-1 mr-4">
        <label className="text-sm font-medium text-[var(--text-primary)] cursor-pointer">
          {label}
        </label>
        <p className="text-xs text-[var(--text-secondary)] mt-1">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 ${
          checked ? 'bg-[var(--accent-primary)]' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const SliderControl = ({ 
    value, 
    onChange, 
    min, 
    max, 
    step = 1, 
    label, 
    description,
    unit = ''
  }: {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step?: number;
    label: string;
    description: string;
    unit?: string;
  }) => (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
        <span className="text-sm text-[var(--text-secondary)]">{value}{unit}</span>
      </div>
      <p className="text-xs text-[var(--text-secondary)] mb-3">{description}</p>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onChange(Math.max(min, value - step))}
          className="p-1 rounded-md bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200"
          aria-label={label}
        />
        <button
          onClick={() => onChange(Math.min(max, value + step))}
          className="p-1 rounded-md bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors"
          aria-label={`Increase ${label}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const TabButton = ({ 
    id, 
    label, 
    icon: Icon, 
    isActive 
  }: { 
    id: string; 
    label: string; 
    icon: any; 
    isActive: boolean; 
  }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-[var(--accent-primary)] text-white'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
      }`}
      aria-selected={isActive}
      role="tab"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[var(--bg-primary)] rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-[var(--border-primary)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-primary)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-[var(--accent-primary)]" />
                <div>
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    Accessibility Settings
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Customize the interface to meet your needs
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetSettings}
                  className="flex items-center space-x-2 px-3 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-primary)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  aria-label="Close accessibility panel"
                >
                  <Monitor className="w-5 h-5 text-[var(--text-muted)]" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-2 mt-4" role="tablist">
              <TabButton id="visual" label="Visual" icon={Eye} isActive={activeTab === 'visual'} />
              <TabButton id="motor" label="Motor" icon={MousePointer2} isActive={activeTab === 'motor'} />
              <TabButton id="cognitive" label="Cognitive" icon={Zap} isActive={activeTab === 'cognitive'} />
              <TabButton id="audio" label="Audio" icon={Volume2} isActive={activeTab === 'audio'} />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {activeTab === 'visual' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                        <Eye className="w-5 h-5" />
                        <span>Visual Accessibility</span>
                      </h3>
                      
                      <div className="space-y-1 divide-y divide-[var(--border-primary)]">
                        <ToggleSwitch
                          checked={settings.highContrast}
                          onChange={(checked) => updateSetting('highContrast', checked)}
                          label="High Contrast Mode"
                          description="Increases contrast between text and backgrounds for better readability"
                        />
                        
                        <ToggleSwitch
                          checked={settings.darkMode}
                          onChange={(checked) => updateSetting('darkMode', checked)}
                          label="Dark Mode"
                          description="Reduces eye strain in low-light environments"
                        />
                        
                        <ToggleSwitch
                          checked={settings.largeText}
                          onChange={(checked) => updateSetting('largeText', checked)}
                          label="Large Text"
                          description="Increases text size across the entire interface"
                        />
                        
                        <ToggleSwitch
                          checked={settings.colorBlindFriendly}
                          onChange={(checked) => updateSetting('colorBlindFriendly', checked)}
                          label="Color Blind Friendly"
                          description="Adjusts colors and adds patterns for better color distinction"
                        />
                      </div>

                      <div className="mt-6 space-y-4 border-t border-[var(--border-primary)] pt-4">
                        <SliderControl
                          value={settings.fontSize}
                          onChange={(value) => updateSetting('fontSize', value)}
                          min={12}
                          max={24}
                          label="Font Size"
                          description="Adjust the base font size for better readability"
                          unit="px"
                        />
                        
                        <SliderControl
                          value={settings.textSpacing}
                          onChange={(value) => updateSetting('textSpacing', value)}
                          min={1}
                          max={2}
                          step={0.1}
                          label="Text Spacing"
                          description="Increase spacing between lines and letters"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'motor' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                        <MousePointer2 className="w-5 h-5" />
                        <span>Motor Accessibility</span>
                      </h3>
                      
                      <div className="space-y-1 divide-y divide-[var(--border-primary)]">
                        <ToggleSwitch
                          checked={settings.keyboardNav}
                          onChange={(checked) => updateSetting('keyboardNav', checked)}
                          label="Enhanced Keyboard Navigation"
                          description="Enables full keyboard navigation with clear focus indicators"
                        />
                        
                        <ToggleSwitch
                          checked={settings.focusIndicator}
                          onChange={(checked) => updateSetting('focusIndicator', checked)}
                          label="Visible Focus Indicators"
                          description="Shows clear outlines around focused elements"
                        />
                        
                        <ToggleSwitch
                          checked={settings.reducedMotion}
                          onChange={(checked) => updateSetting('reducedMotion', checked)}
                          label="Reduce Motion"
                          description="Minimizes animations and transitions that may cause discomfort"
                        />
                      </div>

                      <div className="mt-6 p-4 bg-[var(--bg-secondary)] rounded-lg">
                        <h4 className="font-medium text-[var(--text-primary)] mb-2">Keyboard Shortcuts</h4>
                        <div className="text-sm text-[var(--text-secondary)] space-y-1">
                          <div className="flex justify-between">
                            <span>Navigate:</span>
                            <kbd className="bg-[var(--bg-primary)] px-2 py-1 rounded">Tab / Shift+Tab</kbd>
                          </div>
                          <div className="flex justify-between">
                            <span>Search:</span>
                            <kbd className="bg-[var(--bg-primary)] px-2 py-1 rounded">Ctrl+K</kbd>
                          </div>
                          <div className="flex justify-between">
                            <span>Toggle theme:</span>
                            <kbd className="bg-[var(--bg-primary)] px-2 py-1 rounded">Ctrl+Shift+T</kbd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'cognitive' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                        <Zap className="w-5 h-5" />
                        <span>Cognitive Accessibility</span>
                      </h3>
                      
                      <div className="space-y-1 divide-y divide-[var(--border-primary)]">
                        <ToggleSwitch
                          checked={settings.reducedMotion}
                          onChange={(checked) => updateSetting('reducedMotion', checked)}
                          label="Simplified Interface"
                          description="Reduces visual complexity and distracting animations"
                        />
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                          <h4 className="font-medium text-[var(--text-primary)] mb-2 flex items-center space-x-2">
                            <Keyboard className="w-4 h-4" />
                            <span>Reading Assistance</span>
                          </h4>
                          <p className="text-sm text-[var(--text-secondary)] mb-3">
                            Features to help with reading and comprehension
                          </p>
                          <div className="space-y-2">
                            <label className="flex items-center space-x-2 text-sm">
                              <input type="checkbox" className="rounded" />
                              <span>Reading ruler (horizontal line guide)</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm">
                              <input type="checkbox" className="rounded" />
                              <span>Text highlighting on hover</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm">
                              <input type="checkbox" className="rounded" />
                              <span>Simplified language mode</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'audio' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center space-x-2">
                        <Volume2 className="w-5 h-5" />
                        <span>Audio Accessibility</span>
                      </h3>
                      
                      <div className="space-y-1 divide-y divide-[var(--border-primary)]">
                        <ToggleSwitch
                          checked={settings.soundEnabled}
                          onChange={(checked) => updateSetting('soundEnabled', checked)}
                          label="Sound Effects"
                          description="Enable audio feedback for interactions and notifications"
                        />
                        
                        <ToggleSwitch
                          checked={settings.screenReader}
                          onChange={(checked) => updateSetting('screenReader', checked)}
                          label="Screen Reader Optimization"
                          description="Optimizes content structure and labels for screen readers"
                        />
                      </div>

                      <div className="mt-6 p-4 bg-[var(--bg-secondary)] rounded-lg">
                        <h4 className="font-medium text-[var(--text-primary)] mb-2">Screen Reader Support</h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                          This site is optimized for popular screen readers including:
                        </p>
                        <div className="text-sm text-[var(--text-secondary)] space-y-1">
                          <div>• JAWS (Windows)</div>
                          <div>• NVDA (Windows)</div>
                          <div>• VoiceOver (macOS/iOS)</div>
                          <div>• TalkBack (Android)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
            <div className="flex items-center justify-between">
              <div className="text-sm text-[var(--text-secondary)]">
                Settings are automatically saved and applied
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  <span>Changes saved</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-secondary)] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
