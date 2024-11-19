// src/data/blogData.jsx
export const blogPosts = [
  {
    id: 1,
    title: "Mastering a New Language: Tips and Tricks",
    excerpt: "Discover effective strategies for language learning that will accelerate your progress...",
    content: `
      <div class="prose prose-lg prose-purple dark:prose-invert max-w-none">
        <p class="lead">Learning a new language can be both exciting and challenging. Here are some effective strategies to accelerate your progress and make your learning journey more enjoyable and successful.</p>
        
        <h2>Key Strategies for Success</h2>
        <ul class="list-disc list-inside space-y-3">
          <li>
            <strong>Set Clear Goals:</strong> Define what you want to achieve and set realistic milestones.
            <p class="ml-6">Break down your language learning journey into manageable chunks and celebrate small victories along the way.</p>
          </li>
          <li>
            <strong>Practice Consistently:</strong> Dedicate regular time each day to study and practice.
            <p class="ml-6">Even 15-20 minutes of focused practice daily is better than irregular longer sessions.</p>
          </li>
          <li>
            <strong>Immerse Yourself:</strong> Surround yourself with the language through media, conversations, and reading.
            <p class="ml-6">Watch movies, listen to podcasts, and read books in your target language to improve comprehension.</p>
          </li>
          <li>
            <strong>Use Language Apps:</strong> Leverage tools like Langwa to personalize your learning experience.
            <p class="ml-6">Modern language learning apps use AI to adapt to your learning style and pace.</p>
          </li>
        </ul>

        <h2>The Role of Active Learning</h2>
        <p>Active learning involves engaging with the language in meaningful ways rather than passive memorization. Here are some effective active learning techniques:</p>
        <ul class="list-disc list-inside space-y-2">
          <li>Speaking practice with language exchange partners</li>
          <li>Writing journal entries in your target language</li>
          <li>Recording yourself speaking and analyzing your pronunciation</li>
          <li>Teaching concepts you've learned to others</li>
        </ul>

        <blockquote>
          "The limits of my language mean the limits of my world." - Ludwig Wittgenstein
        </blockquote>

        <h2>Creating a Sustainable Practice Routine</h2>
        <p>Success in language learning comes from consistent, deliberate practice. Here's a suggested weekly routine:</p>
        <ul class="list-disc list-inside space-y-2">
          <li>Monday-Friday: 30 minutes of structured learning</li>
          <li>Saturday: 1 hour of conversation practice</li>
          <li>Sunday: Review and planning for the next week</li>
        </ul>

        <p class="text-xl font-semibold mt-8">Remember: Every expert was once a beginner. With dedication and the right approach, mastering a new language is within your reach!</p>
      </div>
    `,
    author: {
      name: "Sarah Johnson",
      role: "Language Learning Expert",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff"
    },
    date: "November 1, 2024",
    readTime: "5 min read",
    imageUrl: "https://placehold.co/1200x600/8b5cf6/ffffff?text=Language+Learning",
    tags: ["Language Learning", "Education", "Self Improvement"],
    category: "Learning Strategies"
  },
  {
    id: 2,
    title: "The Science Behind Language Acquisition",
    excerpt: "Understanding how our brain processes new languages can help optimize your learning journey...",
    content: `
      <div class="prose prose-lg prose-purple dark:prose-invert max-w-none">
        <p class="lead">Understanding how our brain processes new languages can significantly enhance your learning journey. Here's a deep dive into the science of language acquisition.</p>

        <h2>Neuroplasticity and Language Learning</h2>
        <ul class="list-disc list-inside space-y-3">
          <li>
            <strong>Brain Adaptability:</strong> The brain's ability to form new neural connections when learning a language.
            <p class="ml-6">Research shows that language learning can increase gray matter density and enhance cognitive function.</p>
          </li>
          <li>
            <strong>Memory Formation:</strong> How the brain encodes and retains new language information.
            <p class="ml-6">Understanding memory processes helps optimize study techniques and retention strategies.</p>
          </li>
        </ul>

        <h2>Cognitive Load Theory</h2>
        <p>Managing information processing effectively is crucial for language acquisition:</p>
        <ul class="list-disc list-inside space-y-2">
          <li>Chunking information into manageable pieces</li>
          <li>Using spaced repetition for better retention</li>
          <li>Balancing new and review material</li>
        </ul>

        <blockquote>
          "The brain is like a muscle - the more you use it, the stronger it becomes." - Dr. Paul Thompson
        </blockquote>
      </div>
    `,
    author: {
      name: "Dr. Michael Chen",
      role: "Neurolinguistics Researcher",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=8b5cf6&color=fff"
    },
    date: "October 28, 2024",
    readTime: "7 min read",
    imageUrl: "https://placehold.co/1200x600/8b5cf6/ffffff?text=Language+Science",
    tags: ["Neuroscience", "Learning", "Research"],
    category: "Science & Research"
  },
  {
    id: 3,
    title: "Cultural Immersion: Beyond Words",
    excerpt: "Why understanding cultural context is crucial for true language mastery...",
    content: `
      <div class="prose prose-lg prose-purple dark:prose-invert max-w-none">
        <p class="lead">True language mastery goes beyond vocabulary and grammar. Understanding cultural context is essential for authentic communication.</p>

        <h2>The Cultural Connection</h2>
        <ul class="list-disc list-inside space-y-3">
          <li>
            <strong>Cultural Context:</strong> How social norms influence language use.
            <p class="ml-6">Understanding cultural nuances helps avoid misunderstandings and builds stronger connections.</p>
          </li>
          <li>
            <strong>Non-verbal Communication:</strong> The role of gestures and body language.
            <p class="ml-6">Different cultures have unique non-verbal cues that complement language.</p>
          </li>
        </ul>

        <blockquote>
          "Language is the road map of a culture." - Rita Mae Brown
        </blockquote>
      </div>
    `,
    author: {
      name: "Elena Martinez",
      role: "Cultural Studies Expert",
      avatar: "https://ui-avatars.com/api/?name=Elena+Martinez&background=8b5cf6&color=fff"
    },
    date: "October 25, 2024",
    readTime: "6 min read",
    imageUrl: "https://placehold.co/1200x600/8b5cf6/ffffff?text=Cultural+Immersion",
    tags: ["Culture", "Communication", "Global Learning"],
    category: "Cultural Studies"
  }
];

export const getBlogPost = (id) => {
  return blogPosts.find(post => post.id === parseInt(id));
};