"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, Search, MapPin, DollarSign, X, SlidersHorizontal, Star, Heart, Sparkles } from 'lucide-react';
import { mockArtists, categories, locations, priceRanges } from '@/lib/mock-data';
import Image from 'next/image';

interface Filters {
  search: string;
  categories: string[];
  location: string;
  priceRange: string;
}

const ArtistsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: searchParams.get('category') ? [searchParams.get('category')!] : [],
    location: '',
    priceRange: ''
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredArtists = useMemo(() => {
    return mockArtists.filter(artist => {
      const matchesSearch = filters.search === '' || 
        artist.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        artist.bio.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.some(cat => artist.category.includes(cat));
      
      const matchesLocation = filters.location === '' || artist.location === filters.location;
      
      const matchesPriceRange = filters.priceRange === '' || artist.priceRange === filters.priceRange;
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange && artist.status === 'approved';
    });
  }, [filters]);

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      location: '',
      priceRange: ''
    });
    router.push('/artists');
  };

  const hasActiveFilters = filters.search || filters.categories.length > 0 || filters.location || filters.priceRange;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search" className="text-lg font-semibold text-primary">Search Artists</Label>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-3 h-5 w-5 text-primary" />
          <Input
            id="search"
            placeholder="Search by name or bio..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-12 border-2 border-primary/20 focus:border-primary rounded-xl"
          />
        </div>
      </div>

      <div>
        <Label className="text-lg font-semibold text-primary">Categories</Label>
        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
                className="border-2 border-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor={category} className="text-base font-medium cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="text-lg font-semibold text-primary">Location</Label>
        <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
          <SelectTrigger className="mt-3 border-2 border-primary/20 focus:border-primary rounded-xl">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="priceRange" className="text-lg font-semibold text-primary">Price Range</Label>
        <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
          <SelectTrigger className="mt-3 border-2 border-primary/20 focus:border-primary rounded-xl">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button 
          onClick={clearFilters} 
          variant="outline" 
          className="w-full border-2 border-coral-400 text-coral-600 hover:bg-coral-400 hover:text-white rounded-xl font-semibold"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-neon-50 dark:from-primary/10 dark:via-background dark:to-neon-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block w-80">
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <Card key={i} className="rounded-2xl">
                    <CardHeader>
                      <Skeleton className="h-48 w-full rounded-xl" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-12 w-full rounded-xl" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-neon-50 dark:from-primary/10 dark:via-background dark:to-neon-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-neon-500 text-white px-4 py-2 text-lg">
            <Star className="w-4 h-4 mr-2" />
            Find Your Perfect Artist
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Discover Amazing Performers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse through our collection of verified performers and find the perfect artist for your event!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80">
            <Card className="sticky top-24 rounded-2xl border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="bg-gradient-to-r from-primary to-neon-500 text-white rounded-t-2xl">
                <h3 className="text-xl font-bold flex items-center">
                  <Filter className="w-6 h-6 mr-3" />
                  Filters
                  <Sparkles className="w-5 h-5 ml-auto animate-spin" />
                </h3>
              </CardHeader>
              <CardContent className="p-6">
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Mobile Filters */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between mb-6 bg-card rounded-2xl p-4 shadow-lg border-2 border-primary/20">
              <p className="text-lg font-semibold text-primary">
                {filteredArtists.length} artists found
              </p>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-semibold">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2 h-6 w-6 p-0 text-xs bg-coral-400 text-white">
                        !
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-gradient-to-br from-card to-primary/5">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold text-primary flex items-center">
                      <Filter className="w-6 h-6 mr-2" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Artists Grid */}
          <div className="flex-1">
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap gap-3">
                {filters.search && (
                  <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 rounded-full">
                    Search: {filters.search}
                    <X 
                      className="w-4 h-4 cursor-pointer hover:text-red-500" 
                      onClick={() => updateFilter('search', '')}
                    />
                  </Badge>
                )}
                {filters.categories.map(category => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 rounded-full">
                    {category}
                    <X 
                      className="w-4 h-4 cursor-pointer hover:text-red-500" 
                      onClick={() => toggleCategory(category)}
                    />
                  </Badge>
                ))}
                {filters.location && (
                  <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700 rounded-full">
                    {filters.location}
                    <X 
                      className="w-4 h-4 cursor-pointer hover:text-red-500" 
                      onClick={() => updateFilter('location', '')}
                    />
                  </Badge>
                )}
                {filters.priceRange && (
                  <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-700 rounded-full">
                    {filters.priceRange}
                    <X 
                      className="w-4 h-4 cursor-pointer hover:text-red-500" 
                      onClick={() => updateFilter('priceRange', '')}
                    />
                  </Badge>
                )}
              </div>
            )}

            <div className="hidden lg:block mb-6">
              <p className="text-lg font-semibold text-primary">
                {filteredArtists.length} amazing artists found
              </p>
            </div>

            {filteredArtists.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl shadow-lg border-2 border-primary/20">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-neon-200 flex items-center justify-center">
                  <Search className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">No artists found</h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  Try adjusting your filters or search terms to find more artists!
                </p>
                <Button onClick={clearFilters} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl font-semibold px-6 py-3">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredArtists.map((artist, index) => (
                  <Card key={artist.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-primary/20 hover:border-primary/40 rounded-2xl overflow-hidden bg-gradient-to-br from-card to-primary/5 animate-float" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardHeader className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <Heart className="w-6 h-6 text-white hover:text-red-400 cursor-pointer transition-colors duration-300" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                            {artist.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {artist.category.map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs bg-gradient-to-r from-primary/20 to-neon-200 text-primary border border-primary/30">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {artist.bio}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2 text-green-500" />
                            {artist.location}
                          </div>
                          <div className="flex items-center text-sm font-semibold text-primary">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {artist.priceRange}
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-neon-500 hover:from-neon-500 hover:to-primary text-white font-bold rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          Ask for Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;