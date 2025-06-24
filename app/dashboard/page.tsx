"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Eye, Check, X, Users, Clock, CheckCircle, XCircle, Filter, Star, Sparkles, Trophy, Heart, MapPin } from 'lucide-react';
import { mockArtists, categories } from '@/lib/mock-data';
import { toast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredArtists = useMemo(() => {
    return mockArtists.filter(artist => {
      const matchesSearch = searchTerm === '' || 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || 
        artist.category.some(cat => cat === categoryFilter);
      
      const matchesStatus = statusFilter === 'all' || artist.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const paginatedArtists = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArtists.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArtists, currentPage]);

  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);

  const statusCounts = useMemo(() => {
    return {
      total: mockArtists.length,
      pending: mockArtists.filter(a => a.status === 'pending').length,
      approved: mockArtists.filter(a => a.status === 'approved').length,
      rejected: mockArtists.filter(a => a.status === 'rejected').length
    };
  }, []);

  const handleStatusChange = (artistId: number, newStatus: 'approved' | 'rejected') => {
    // In a real app, this would make an API call
    toast({
      title: `Artist ${newStatus}!`,
      description: `The artist application has been ${newStatus}. ${newStatus === 'approved' ? 'Welcome to the Artistly family!' : ''}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-400 bg-orange-50 dark:bg-orange-950 px-3 py-1 font-semibold"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-400 bg-green-50 dark:bg-green-950 px-3 py-1 font-semibold"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-400 bg-red-50 dark:bg-red-950 px-3 py-1 font-semibold"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-neon-50 dark:from-primary/10 dark:via-background dark:to-neon-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-neon-500 text-white px-6 py-3 text-lg">
            <Trophy className="w-5 h-5 mr-2" />
            Manager Dashboard
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Artist Management Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage artist applications and approvals with ease!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-primary">Total Applications</CardTitle>
              <Users className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{statusCounts.total}</div>
              <p className="text-sm text-muted-foreground mt-1">All time submissions</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-card to-orange-50 dark:to-orange-950 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-orange-600">Pending Review</CardTitle>
              <Clock className="h-6 w-6 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{statusCounts.pending}</div>
              <p className="text-sm text-orange-500 mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-card to-green-50 dark:to-green-950 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-green-600">Approved</CardTitle>
              <CheckCircle className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{statusCounts.approved}</div>
              <p className="text-sm text-green-500 mt-1">Active artists</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-card to-red-50 dark:to-red-950 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-bold text-red-600">Rejected</CardTitle>
              <XCircle className="h-6 w-6 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{statusCounts.rejected}</div>
              <p className="text-sm text-red-500 mt-1">Not approved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary to-neon-500 text-white rounded-t-2xl">
            <CardTitle className="text-xl font-bold flex items-center">
              <Filter className="w-6 h-6 mr-3" />
              Filter Applications
              <Sparkles className="w-5 h-5 ml-auto animate-spin" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-primary" />
                  <Input
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 border-2 border-primary/30 focus:border-primary rounded-xl text-lg p-4"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-56 border-2 border-primary/30 focus:border-primary rounded-xl text-lg p-4">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-lg">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-2 border-primary/30 focus:border-primary rounded-xl text-lg p-4">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary to-neon-500 text-white rounded-t-2xl">
            <CardTitle className="text-xl font-bold flex items-center">
              <Star className="w-6 h-6 mr-3" />
              Artist Applications
            </CardTitle>
            <CardDescription className="text-white/90 text-lg">
              {filteredArtists.length} of {mockArtists.length} applications shown
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-b-2xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10 hover:bg-primary/15">
                    <TableHead className="font-bold text-primary text-lg">Artist</TableHead>
                    <TableHead className="font-bold text-primary text-lg">Category</TableHead>
                    <TableHead className="font-bold text-primary text-lg">Location</TableHead>
                    <TableHead className="font-bold text-primary text-lg">Fee Range</TableHead>
                    <TableHead className="font-bold text-primary text-lg">Status</TableHead>
                    <TableHead className="font-bold text-primary text-lg">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedArtists.map((artist) => (
                    <TableRow key={artist.id} className="hover:bg-primary/5 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12 border-2 border-primary/30">
                            <AvatarImage src={artist.image} alt={artist.name} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-neon-500 text-white font-bold">
                              {artist.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-lg text-foreground">{artist.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Trophy className="w-3 h-3 mr-1" />
                              {artist.experience} years exp.
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {artist.category.slice(0, 2).map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-xs bg-gradient-to-r from-primary/20 to-neon-200 text-primary border border-primary/30">
                              {cat}
                            </Badge>
                          ))}
                          {artist.category.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gradient-to-r from-sunshine-200 to-coral-200 text-sunshine-700">
                              +{artist.category.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{artist.location}</TableCell>
                      <TableCell className="font-bold text-primary">{artist.priceRange}</TableCell>
                      <TableCell>{getStatusBadge(artist.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedArtist(artist)}
                                className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-lg font-semibold"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl rounded-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-primary flex items-center">
                                  <Star className="w-6 h-6 mr-2" />
                                  Artist Details
                                </DialogTitle>
                                <DialogDescription className="text-lg text-muted-foreground">
                                  Review the artist's complete profile
                                </DialogDescription>
                              </DialogHeader>
                              {selectedArtist && (
                                <div className="space-y-6">
                                  <div className="flex items-center space-x-6 p-4 bg-gradient-to-r from-primary/10 to-neon-100 dark:to-neon-900 rounded-2xl">
                                    <Avatar className="w-20 h-20 border-4 border-primary/30">
                                      <AvatarImage src={selectedArtist.image} alt={selectedArtist.name} />
                                      <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-neon-500 text-white font-bold">
                                        {selectedArtist.name.split(' ').map((n: string) => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-2xl font-bold text-foreground">{selectedArtist.name}</h3>
                                      <p className="text-muted-foreground text-lg flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {selectedArtist.location}
                                      </p>
                                      <div className="flex items-center space-x-2 mt-2">
                                        {getStatusBadge(selectedArtist.status)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-bold mb-3 text-lg text-primary flex items-center">
                                      <Heart className="w-5 h-5 mr-2" />
                                      Bio
                                    </h4>
                                    <p className="text-foreground leading-relaxed">{selectedArtist.bio}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-bold mb-3 text-lg text-primary">Categories</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedArtist.category.map((cat: string) => (
                                          <Badge key={cat} variant="secondary" className="bg-gradient-to-r from-primary/20 to-neon-200 text-primary border border-primary/30">
                                            {cat}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-bold mb-3 text-lg text-primary">Languages</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {selectedArtist.languages.map((lang: string) => (
                                          <Badge key={lang} variant="outline" className="border-2 border-primary/30 text-primary">
                                            {lang}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-3 gap-6 p-4 bg-gradient-to-r from-sunshine-50 to-coral-50 dark:from-sunshine-950 dark:to-coral-950 rounded-2xl">
                                    <div>
                                      <h4 className="font-bold mb-2 text-primary">Experience</h4>
                                      <p className="text-foreground font-semibold">{selectedArtist.experience} years</p>
                                    </div>
                                    <div>
                                      <h4 className="font-bold mb-2 text-primary">Fee Range</h4>
                                      <p className="text-foreground font-semibold">{selectedArtist.priceRange}</p>
                                    </div>
                                    <div>
                                      <h4 className="font-bold mb-2 text-primary">Travel</h4>
                                      <p className="text-foreground font-semibold">
                                        {selectedArtist.availableForTravel ? 'Available' : 'Local only'}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {selectedArtist.status === 'pending' && (
                                    <div className="flex space-x-4 pt-4 border-t-2 border-primary/20">
                                      <Button 
                                        onClick={() => handleStatusChange(selectedArtist.id, 'approved')}
                                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-xl py-3 text-lg"
                                      >
                                        <Check className="w-5 h-5 mr-2" />
                                        Approve
                                      </Button>
                                      <Button 
                                        variant="destructive"
                                        onClick={() => handleStatusChange(selectedArtist.id, 'rejected')}
                                        className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-rose-500 hover:to-red-500 font-bold rounded-xl py-3 text-lg"
                                      >
                                        <X className="w-5 h-5 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {artist.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => handleStatusChange(artist.id, 'approved')}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-semibold rounded-lg"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleStatusChange(artist.id, 'rejected')}
                                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-rose-500 hover:to-red-500 font-semibold rounded-lg"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-6 border-t-2 border-primary/20 bg-gradient-to-r from-primary/5 to-neon-50 dark:to-neon-950">
                <div className="text-lg text-muted-foreground font-medium">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredArtists.length)} of {filteredArtists.length} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-lg font-semibold"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page 
                            ? "bg-gradient-to-r from-primary to-neon-500 text-white font-bold rounded-lg" 
                            : "border-2 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-lg font-semibold"
                          }
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white rounded-lg font-semibold"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;