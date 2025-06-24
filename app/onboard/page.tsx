"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Upload, CheckCircle, AlertCircle, Star, Sparkles } from 'lucide-react';
import { categories, languages, experienceRanges, locations, priceRanges } from '@/lib/mock-data';

interface FormData {
  // Step 1
  fullName: string;
  bio: string;
  profileImage: string;
  
  // Step 2
  selectedCategories: string[];
  selectedLanguages: string[];
  experience: string;
  
  // Step 3
  priceRange: string;
  location: string;
  availableForTravel: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const OnboardPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    bio: '',
    profileImage: '',
    selectedCategories: [],
    selectedLanguages: [],
    experience: '',
    priceRange: '',
    location: '',
    availableForTravel: false
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.bio.trim()) {
        newErrors.bio = 'Bio is required';
      } else if (formData.bio.length > 500) {
        newErrors.bio = 'Bio must be less than 500 characters';
      }
    }

    if (step === 2) {
      if (formData.selectedCategories.length === 0) {
        newErrors.selectedCategories = 'Please select at least one category';
      }
      if (formData.selectedLanguages.length === 0) {
        newErrors.selectedLanguages = 'Please select at least one language';
      }
      if (!formData.experience) {
        newErrors.experience = 'Please select your experience level';
      }
    }

    if (step === 3) {
      if (!formData.priceRange) {
        newErrors.priceRange = 'Please select a price range';
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form Data Submitted:', formData);
      
      toast({
        title: "Application Submitted Successfully!",
        description: "We'll review your application and get back to you within 2-3 business days. Welcome to the Artistly family!",
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter(c => c !== category)
        : [...prev.selectedCategories, category]
    }));
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      selectedLanguages: prev.selectedLanguages.includes(language)
        ? prev.selectedLanguages.filter(l => l !== language)
        : [...prev.selectedLanguages, language]
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <Label htmlFor="fullName" className="text-lg font-semibold text-primary flex items-center">
          Full Name *
        </Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          placeholder="Enter your full name"
          className={`mt-3 border-2 rounded-xl text-lg p-4 ${errors.fullName ? "border-red-400" : "border-primary/30 focus:border-primary"}`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="bio" className="text-lg font-semibold text-primary flex items-center">
          Bio/Description *
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
          placeholder="Tell us about yourself, your experience, and what makes you unique..."
          rows={5}
          maxLength={500}
          className={`mt-3 border-2 rounded-xl text-lg p-4 ${errors.bio ? "border-red-400" : "border-primary/30 focus:border-primary"}`}
        />
        <div className="flex justify-between items-center mt-2">
          {errors.bio && (
            <p className="text-sm text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.bio}
            </p>
          )}
          <p className="text-sm text-muted-foreground ml-auto font-medium">
            {formData.bio.length}/500 characters
          </p>
        </div>
      </div>

      <div>
        <Label className="text-lg font-semibold text-primary flex items-center">
          Profile Image (Optional)
        </Label>
        <div className="mt-3 border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center hover:border-primary/60 transition-colors bg-gradient-to-br from-primary/5 to-neon-50 dark:to-neon-950">
          <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground mb-4">
            Drag and drop your image here, or click to browse
          </p>
          <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-semibold">
            Choose File
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div>
        <Label className="text-lg font-semibold text-primary flex items-center">
          Categories *
        </Label>
        <p className="text-muted-foreground mb-4 text-lg">
          Select all categories that apply to you
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => toggleCategory(category)}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-lg ${
                formData.selectedCategories.includes(category)
                  ? 'border-primary bg-gradient-to-br from-primary/10 to-neon-100 dark:to-neon-900 shadow-lg'
                  : 'border-primary/20 hover:border-primary/40 bg-card'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={formData.selectedCategories.includes(category)}
                  readOnly
                  className="border-2 border-primary data-[state=checked]:bg-primary"
                />
                <Label className="cursor-pointer font-medium text-lg">
                  {category}
                </Label>
              </div>
            </div>
          ))}
        </div>
        {errors.selectedCategories && (
          <p className="text-sm text-red-500 mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.selectedCategories}
          </p>
        )}
      </div>

      <div>
        <Label className="text-lg font-semibold text-primary flex items-center">
          Languages Spoken *
        </Label>
        <p className="text-muted-foreground mb-4 text-lg">
          Select all languages you can perform in
        </p>
        <div className="flex flex-wrap gap-3">
          {languages.map((language) => (
            <Badge
              key={language}
              variant={formData.selectedLanguages.includes(language) ? "default" : "outline"}
              className={`cursor-pointer text-lg px-4 py-2 rounded-full transition-all hover:scale-105 ${
                formData.selectedLanguages.includes(language) 
                  ? 'bg-gradient-to-r from-primary to-neon-500 text-white shadow-lg' 
                  : 'border-2 border-primary/30 text-primary hover:border-primary'
              }`}
              onClick={() => toggleLanguage(language)}
            >
              {language}
            </Badge>
          ))}
        </div>
        {errors.selectedLanguages && (
          <p className="text-sm text-red-500 mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.selectedLanguages}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="experience" className="text-lg font-semibold text-primary flex items-center">
          Years of Experience *
        </Label>
        <Select
          value={formData.experience}
          onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
        >
          <SelectTrigger className={`mt-3 border-2 rounded-xl text-lg p-4 h-14 ${errors.experience ? "border-red-400" : "border-primary/30 focus:border-primary"}`}>
            <SelectValue placeholder="Select your experience level" />
          </SelectTrigger>
          <SelectContent>
            {experienceRanges.map((range) => (
              <SelectItem key={range} value={range} className="text-lg">
                {range} years
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.experience && (
          <p className="text-sm text-red-500 mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.experience}
          </p>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div>
        <Label htmlFor="priceRange" className="text-lg font-semibold text-primary flex items-center">
          Fee Range *
        </Label>
        <Select
          value={formData.priceRange}
          onValueChange={(value) => setFormData(prev => ({ ...prev, priceRange: value }))}
        >
          <SelectTrigger className={`mt-3 border-2 rounded-xl text-lg p-4 h-14 ${errors.priceRange ? "border-red-400" : "border-primary/30 focus:border-primary"}`}>
            <SelectValue placeholder="Select your fee range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range} value={range} className="text-lg">
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.priceRange && (
          <p className="text-sm text-red-500 mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.priceRange}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="location" className="text-lg font-semibold text-primary flex items-center">
          Location/City *
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          placeholder="Enter your city"
          className={`mt-3 border-2 rounded-xl text-lg p-4 ${errors.location ? "border-red-400" : "border-primary/30 focus:border-primary"}`}
        />
        {errors.location && (
          <p className="text-sm text-red-500 mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.location}
          </p>
        )}
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/10 to-neon-100 dark:to-neon-900 rounded-2xl border-2 border-primary/20">
        <Switch
          id="availableForTravel"
          checked={formData.availableForTravel}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, availableForTravel: checked }))}
          className="data-[state=checked]:bg-primary"
        />
        <Label htmlFor="availableForTravel" className="text-lg font-medium text-primary">
          Available for travel to other cities
        </Label>
      </div>

      <Alert className="border-2 border-sunshine-400 bg-gradient-to-r from-sunshine-50 to-coral-50 dark:from-sunshine-950 dark:to-coral-950 rounded-2xl">
        <AlertCircle className="h-5 w-5 text-sunshine-600" />
        <AlertDescription className="text-lg text-sunshine-700 dark:text-sunshine-300 font-medium">
          Please review all information carefully before submitting. You'll be able to edit your profile after approval.
        </AlertDescription>
      </Alert>
    </div>
  );

  const stepTitles = [
    'Basic Information',
    'Professional Details',
    'Pricing & Location'
  ];

  const stepDescriptions = [
    'Tell us about yourself',
    'Share your talents and skills',
    'Set your rates and availability'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-neon-50 dark:from-primary/10 dark:via-background dark:to-neon-950 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-8 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-neon-500 text-white px-6 py-3 text-lg">
            <Star className="w-5 h-5 mr-2" />
            Join Our Artist Community
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Become an Artistly Star!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your profile and start receiving booking requests from event planners across India!
          </p>
        </div>

        <Card className="rounded-3xl border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="bg-gradient-to-r from-primary to-neon-500 text-white rounded-t-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <CardTitle className="text-2xl font-bold">Step {currentStep} of {totalSteps}</CardTitle>
                <CardDescription className="text-white/90 text-lg mt-2">{stepTitles[currentStep - 1]}</CardDescription>
                <p className="text-white/80 mt-1">{stepDescriptions[currentStep - 1]}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg font-bold">
                  {Math.round(progress)}% Complete
                </Badge>
                <Sparkles className="w-8 h-8 animate-spin" />
              </div>
            </div>
            <Progress value={progress} className="w-full h-3 bg-white/20" />
          </CardHeader>

          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between pt-8 mt-8 border-t-2 border-primary/20">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-xl font-semibold px-6 py-3 text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-primary to-neon-500 hover:from-neon-500 hover:to-primary text-white font-bold rounded-xl px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Next Step
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-w-[180px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardPage;