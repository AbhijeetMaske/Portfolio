
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, SendHorizontal, Lock, CheckCircle, Copy, Linkedin, Loader2, Check, AlertCircle, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const [buttonStatus, setButtonStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Animation State
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = {
    email: "Abhijeet.maske@yahoo.com",
    phone: "+91 84849 44797",
    location: "Pune, India",
    linkedin: "https://www.linkedin.com/in/abhijeet-r-maske",
    github: "https://github.com/AbhijeetMaske"
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    // Name Validation
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formState.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Message Validation
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value
    });

    // Clear error for this field when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors({
        ...errors,
        [id]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setButtonStatus('loading');
    
    // Simulate API call and save to LocalStorage
    setTimeout(() => {
      // 1. Get existing messages
      const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      
      // 2. Create new message object
      const newMessage = {
        id: Date.now(),
        name: formState.name,
        email: formState.email,
        message: formState.message,
        date: new Date().toLocaleString()
      };

      // 3. Save back to localStorage
      localStorage.setItem('portfolio_messages', JSON.stringify([newMessage, ...existingMessages]));

      setButtonStatus('success');
      setIsUnlocked(true);
      
      // Reset form
      setFormState({ name: '', email: '', message: '' });
    }, 1500);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-transparent text-foreground relative overflow-hidden" aria-label="Contact Section">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap lg:gap-16 items-start">
          
          {/* Contact Info Column (Left) */}
          <div className="w-full lg:w-5/12 mb-12 lg:mb-0">
            <div className={`mb-10 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              <h2 className="text-4xl font-bold mb-6 tracking-tight text-foreground">Let's Connect</h2>
              <p className="text-muted-foreground text-lg leading-relaxed opacity-90">
                I'm available to lead high-impact projects and drive product delivery excellence. 
                {isUnlocked 
                  ? " Here are my direct contact details:" 
                  : " Please fill out the form to unlock my contact information."}
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Email Card Wrapper */}
              <div className={`transition-all duration-700 delay-100 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className={`relative group bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-4 transition-all duration-300 ${!isUnlocked && 'hover:bg-card/60'}`}>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs font-bold text-primary uppercase tracking-wider mb-0.5">Email</span>
                      <div className="text-lg font-medium truncate text-foreground">
                        {isUnlocked ? contactInfo.email : "Abhijeet.maske@..."}
                      </div>
                    </div>
                    {isUnlocked ? (
                      <button 
                        onClick={() => copyToClipboard(contactInfo.email, 'email')}
                        className="p-2 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                        aria-label="Copy email"
                      >
                        {copiedField === 'email' ? <Check className="w-5 h-5 text-green-600 dark:text-green-400" /> : <Copy className="w-5 h-5 text-primary" />}
                      </button>
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground opacity-50" />
                    )}
                  </div>
                </div>
              </div>

              {/* Phone Card Wrapper */}
              <div className={`transition-all duration-700 delay-200 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className={`relative group bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-4 transition-all duration-300 ${!isUnlocked && 'hover:bg-card/60'}`}>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-300 uppercase tracking-wider mb-0.5">Mobile</span>
                      <div className="text-lg font-medium truncate text-foreground">
                        {isUnlocked ? contactInfo.phone : "+91 84849 *****"}
                      </div>
                    </div>
                    {isUnlocked ? (
                      <button 
                        onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                        className="p-2 hover:bg-accent rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        aria-label="Copy phone number"
                      >
                        {copiedField === 'phone' ? <Check className="w-5 h-5 text-green-600 dark:text-green-400" /> : <Copy className="w-5 h-5 text-emerald-600 dark:text-emerald-200" />}
                      </button>
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground opacity-50" />
                    )}
                  </div>
                </div>
              </div>

              {/* Location Card Wrapper */}
              <div className={`transition-all duration-700 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <div className="bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-4">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/20">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-xs font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider mb-0.5">Location</span>
                      <div className="text-lg font-medium text-foreground">{contactInfo.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LinkedIn Button Wrapper */}
              <div className={`transition-all duration-700 delay-400 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <a 
                  href="https://www.linkedin.com/in/abhijeet-r-maske"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#0077b5] hover:bg-[#006396] text-white p-4 rounded-2xl transition-all shadow-lg hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-0.5">Social Profile</span>
                      <span className="text-lg font-bold">Connect on LinkedIn</span>
                    </div>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                    <SendHorizontal className="w-5 h-5 -rotate-45" />
                  </div>
                </a>
              </div>

              {/* GitHub Button Wrapper */}
              <div className={`transition-all duration-700 delay-500 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <a 
                  href="https://github.com/AbhijeetMaske"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-foreground text-background hover:brightness-110 p-4 rounded-2xl transition-all shadow-lg hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-background/20 rounded-xl flex items-center justify-center">
                      <Github className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-background/80 uppercase tracking-wider mb-0.5">Source Control</span>
                      <span className="text-lg font-bold">Follow on GitHub</span>
                    </div>
                  </div>
                  <div className="bg-background/20 p-2 rounded-lg group-hover:bg-background/30 transition-colors">
                    <SendHorizontal className="w-5 h-5 -rotate-45" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Column (Right) */}
          <div className={`w-full lg:flex-1 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Form Container */}
              <div className={`bg-card rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-border transition-all duration-500 ${isUnlocked ? 'opacity-0 pointer-events-none absolute inset-0 scale-95' : 'opacity-100 scale-100'}`}>
                <h3 className="text-3xl font-black text-foreground mb-8 tracking-tight">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground mb-2 uppercase tracking-[0.2em]" htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 rounded-2xl bg-accent border text-foreground transition-all outline-none font-medium ${
                        errors.name 
                          ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' 
                          : 'border-border focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10'
                      }`}
                      placeholder="John Doe"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1 uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground mb-2 uppercase tracking-[0.2em]" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formState.email}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 rounded-2xl bg-accent border text-foreground transition-all outline-none font-medium ${
                        errors.email
                          ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' 
                          : 'border-border focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10'
                      }`}
                      placeholder="name@company.com"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1 uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-muted-foreground mb-2 uppercase tracking-[0.2em]" htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      value={formState.message}
                      onChange={handleInputChange}
                      className={`w-full px-5 py-4 rounded-2xl bg-accent border text-foreground transition-all outline-none resize-none font-medium ${
                        errors.message
                          ? 'border-red-500 focus:ring-4 focus:ring-red-500/10' 
                          : 'border-border focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/10'
                      }`}
                      placeholder="Hi, I'd like to discuss a project..."
                      required
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500 font-bold flex items-center gap-1 uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button 
                    type="submit"
                    disabled={buttonStatus === 'loading'}
                    className="w-full bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {buttonStatus === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Transmission
                        <SendHorizontal className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Your details are safe. Submitting unlocks my contact info.
                  </p>
                </form>
              </div>

              {/* Success Message Overlay */}
              <div className={`bg-card rounded-3xl p-8 lg:p-10 shadow-2xl flex flex-col items-center justify-center text-center h-full min-h-[500px] transition-all duration-500 ${isUnlocked ? 'opacity-100 scale-100 relative z-10' : 'opacity-0 pointer-events-none absolute inset-0 scale-95'}`}>
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6 animate-[bounce_1s_infinite]">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Message Sent!</h3>
                <p className="text-muted-foreground mb-8 max-w-md text-lg">
                  Thank you, <strong>{formState.name}</strong>. I've received your inquiry. <br/>
                  My contact details are now unlocked on the left.
                </p>
                
                <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 w-full max-w-sm mb-8">
                   <p className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                     <Mail className="w-4 h-4" /> 
                     Check your inbox for a confirmation.
                   </p>
                </div>

                <button 
                  onClick={() => setIsUnlocked(false)}
                  className="text-muted-foreground hover:text-primary font-medium text-sm transition-colors"
                >
                  Send another message
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
