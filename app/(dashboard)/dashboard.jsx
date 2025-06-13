import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { databases } from '../../lib/appwrite'
import { Query } from 'react-native-appwrite'

// themed components
import ThemedView from "../../components/ThemedView"
import ThemedTextInput from '../../components/ThemedTextInput'
import ThemedText from "../../components/ThemedText"
import ThemedCard from "../../components/ThemedCard"
import Spacer from '../../components/Spacer'

const DATABASE_ID = "kamikazi"
const BOOKS_COLLECTION_ID = "684a6d00002eab70c037"

const { width } = Dimensions.get('window')

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    booksThisMonth: 0,
    activeUsers: 0,
    loading: true
  })

  const [recentBooks, setRecentBooks] = useState([])
  const [topAuthors, setTopAuthors] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      setStats(prev => ({ ...prev, loading: true }))

      // Fetch total books
      const booksResponse = await databases.listDocuments(
        DATABASE_ID,
        BOOKS_COLLECTION_ID,
        [Query.limit(1000)] // Adjust limit as needed
      )

      const totalBooks = booksResponse.total
      const books = booksResponse.documents

      // Calculate books this month
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const booksThisMonth = books.filter(book => {
        const bookDate = new Date(book.$createdAt)
        return bookDate.getMonth() === currentMonth && bookDate.getFullYear() === currentYear
      }).length

      // Get unique users count from books
      const uniqueUserIds = [...new Set(books.map(book => book.userId))]
      const activeUsers = uniqueUserIds.length

      // Get recent books (last 5)
      const recent = books
        .sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt))
        .slice(0, 5)

      // Calculate top authors
      const authorCount = {}
      books.forEach(book => {
        const author = book.author
        authorCount[author] = (authorCount[author] || 0) + 1
      })
      
      const topAuthorsArray = Object.entries(authorCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([author, count]) => ({ author, count }))

      // Try to get total users from account service (this might need admin permissions)
      let totalUsers = activeUsers // fallback to active users
      try {
        // This would require admin permissions in Appwrite
        // const usersResponse = await account.listUsers()
        // totalUsers = usersResponse.total
      } catch (error) {
        console.log('Could not fetch total users, using active users count')
      }

      setStats({
        totalUsers,
        totalBooks,
        booksThisMonth,
        activeUsers,
        loading: false
      })

      setRecentBooks(recent)
      setTopAuthors(topAuthorsArray)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  const StatCard = ({ title, value, subtitle, color = '#007AFF' }) => (
    <ThemedCard style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <ThemedText style={styles.statValue}>{stats.loading ? '...' : value}</ThemedText>
      <ThemedText style={styles.statTitle}>{title}</ThemedText>
      {subtitle && <ThemedText style={styles.statSubtitle}>{subtitle}</ThemedText>}
    </ThemedCard>
  )

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        
        <ThemedText title={true} style={styles.heading}>
          Admin Dashboard
        </ThemedText>
        <Spacer />

        {/* Stats Cards Grid */}
        <ThemedView style={styles.statsGrid}>
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            subtitle="Registered users"
            color="#007AFF"
          />
          <StatCard 
            title="Total Books" 
            value={stats.totalBooks} 
            subtitle="In library"
            color="#34C759"
          />
          <StatCard 
            title="This Month" 
            value={stats.booksThisMonth} 
            subtitle="Books added"
            color="#FF9500"
          />
          <StatCard 
            title="Active Users" 
            value={stats.activeUsers} 
            subtitle="With books"
            color="#AF52DE"
          />
        </ThemedView>

        <Spacer size={30} />

        {/* Recent Books Section */}
        <ThemedText style={styles.sectionTitle}>Recent Books</ThemedText>
        <Spacer />
        
        <ThemedCard style={styles.listCard}>
          {recentBooks.length > 0 ? (
            recentBooks.map((book, index) => (
              <ThemedView key={book.$id} style={styles.bookItem}>
                <ThemedView style={styles.bookInfo}>
                  <ThemedText style={styles.bookTitle}>{book.title}</ThemedText>
                  <ThemedText style={styles.bookAuthor}>by {book.author}</ThemedText>
                  <ThemedText style={styles.bookDate}>Added {formatDate(book.$createdAt)}</ThemedText>
                </ThemedView>
                {index < recentBooks.length - 1 && <ThemedView style={styles.separator} />}
              </ThemedView>
            ))
          ) : (
            <ThemedText style={styles.emptyText}>No recent books</ThemedText>
          )}
        </ThemedCard>

        <Spacer size={30} />

        {/* Top Authors Section */}
        <ThemedText style={styles.sectionTitle}>Top Authors</ThemedText>
        <Spacer />
        
        <ThemedCard style={styles.listCard}>
          {topAuthors.length > 0 ? (
            topAuthors.map((item, index) => (
              <ThemedView key={item.author} style={styles.authorItem}>
                <ThemedView style={styles.authorInfo}>
                  <ThemedText style={styles.authorName}>{item.author}</ThemedText>
                  <ThemedText style={styles.authorCount}>{item.count} book{item.count > 1 ? 's' : ''}</ThemedText>
                </ThemedView>
                <ThemedView style={[styles.authorRank, { backgroundColor: getRankColor(index) }]}>
                  <ThemedText style={styles.rankText}>{index + 1}</ThemedText>
                </ThemedView>
                {index < topAuthors.length - 1 && <ThemedView style={styles.separator} />}
              </ThemedView>
            ))
          ) : (
            <ThemedText style={styles.emptyText}>No authors data</ThemedText>
          )}
        </ThemedCard>

        <Spacer size={50} />
      </ThemedView>
    </ScrollView>
  )
}

const getRankColor = (index) => {
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#007AFF', '#34C759']
  return colors[index] || '#999'
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2, // Account for padding and gap
    marginBottom: 15,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  statSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listCard: {
    padding: 20,
  },
  bookItem: {
    paddingVertical: 10,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 2,
  },
  bookDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  authorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  authorCount: {
    fontSize: 14,
    opacity: 0.7,
  },
  authorRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
  },
})