import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Users, Calendar, Star, ArrowRight, Sparkles, Music, Zap, Heart, Trophy } from 'lucide-react';

const categories = [
  {
    title: 'Singers',
    description: 'Professional vocalists for all genres',
    icon: Mic,
    count: '500+',
    href: '/artists?category=Singer',
    gradient: 'from-pink-400 via-rose-400 to-red-400',
    bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950',
    iconColor: 'text-pink-600'
  },
  {
    title: 'Dancers',
    description: 'Classical to contemporary performers',
    icon: Users,
    count: '300+',
    href: '/artists?category=Dancer',
    gradient: 'from-purple-400 via-violet-400 to-indigo-400',
    bgGradient: 'from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Speakers',
    description: 'Motivational and keynote speakers',
    icon: Calendar,
    count: '200+',
    href: '/artists?category=Speaker',
    gradient: 'from-blue-400 via-cyan-400 to-teal-400',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950',
    iconColor: 'text-blue-600'
  },
  {
    title: 'DJs',
    description: 'Electronic music and party specialists',
    icon: Music,
    count: '150+',
    href: '/artists?category=DJ',
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950',
    iconColor: 'text-green-600'
  }
];

const features = [
  {
    title: 'Verified Artists',
    description: 'All artists are professionally verified and background checked',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950'
  },
  {
    title: 'Easy Booking',
    description: 'Simple booking process with transparent pricing',
    icon: Zap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950'
  },
  {
    title: 'Wide Network',
    description: 'Access to performers across India in multiple categories',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-950'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-neon-50 to-sunshine-50 dark:from-primary/20 dark:via-neon-950 dark:to-sunshine-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-70 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-primary/20 to-neon-200 text-primary border-primary/30 px-4 py-2 text-sm font-semibold animate-bounce-gentle">
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              India's Most Vibrant Artist Booking Platform
              <Trophy className="w-4 h-4 ml-2 text-yellow-500" />
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Book Amazing{' '}
              <span className="rainbow-text animate-glow">
                Performers
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-neon-500 to-sunshine-500 bg-clip-text text-transparent">
                For Your Events
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Connect with talented artists and performers across India. From singers and dancers to speakers and DJs, 
              find the perfect entertainment for your special occasions!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" asChild className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-neon-500 hover:from-neon-500 hover:to-primary text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse-glow">
                <Link href="/artists">
                  Explore Artists
                  <ArrowRight className="ml-2 h-6 w-6 animate-bounce-gentle" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="/onboard">
                  Join as Artist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-neon-50 dark:via-primary/10 dark:to-neon-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-sunshine-400 to-coral-400 text-white px-4 py-2">
              Artist Categories
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Find Artists by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover talented performers across various categories for your next unforgettable event!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link key={category.title} href={category.href}>
                  <Card className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-0 bg-card backdrop-blur-sm overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <CardHeader className="text-center pb-4 relative z-10">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl animate-float`} style={{animationDelay: `${index * 0.5}s`}}>
                        <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300 font-bold">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-base text-muted-foreground group-hover:text-foreground">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="text-center pt-0 relative z-10">
                      <Badge variant="secondary" className="font-bold text-lg px-4 py-2 bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {category.count} Artists
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-sunshine-50 via-background to-coral-50 dark:from-sunshine-950 dark:via-background dark:to-coral-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-electric-400 to-neon-400 text-white px-4 py-2">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why Choose Artistly?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We make it easy and joyful to find and book the perfect artists for your events!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center group">
                  <div className={`w-24 h-24 mx-auto rounded-full ${feature.bgColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl animate-float`} style={{animationDelay: `${index * 0.7}s`}}>
                    <Icon className={`w-12 h-12 ${feature.color} group-hover:animate-wiggle`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-neon-500 to-electric-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-bounce-gentle">
            Ready to Book Your Perfect Artist?
          </h2>
          <p className="text-xl sm:text-2xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of event planners who trust Artistly to find amazing performers and create unforgettable experiences!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4 bg-white text-primary hover:bg-gray-100 font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
              <Link href="/artists">
                Browse Artists
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link href="/onboard">
                Join as Artist
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Mic className="h-10 w-10 text-primary animate-pulse" />
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-sunshine-400 animate-spin" />
                </div>
                <span className="text-3xl font-bold rainbow-text">Artistly</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
                India's most vibrant platform for booking talented artists and performers for all your events. 
                Making every celebration unforgettable!
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-xl text-primary">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/artists" className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Browse Artists</Link></li>
                <li><Link href="/onboard" className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Join as Artist</Link></li>
                <li><Link href="/dashboard" className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-6 text-xl text-primary">Support</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Help Center</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-300 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2024 Artistly. All rights reserved. Made with love for artists and event planners!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}