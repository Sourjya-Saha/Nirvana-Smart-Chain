import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize the Prisma client
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create the review in the database with all the new fields
// Create the review in the database with all the new fields
const review = await prisma.pharmareview.create({
  data: {
    reviewerName: data.name,
    // Challenge assessment fields
    trackingDifficulty: parseInt(data.trackingDifficulty) || 0,
    shortageImportance: parseInt(data.shortageImportance) || 0,
    verificationChallenge: parseInt(data.verificationChallenge) || 0,
    communicationFrequency: parseInt(data.communicationFrequency) || 0,
    visibilityImportance: parseInt(data.visibilityImportance) || 0,
    counterfeitConcern: parseInt(data.counterfeitConcern) || 0,
    regulatoryWorkload: parseInt(data.regulatoryWorkload) || 0,
    
    // Authentication fields
    localRetailerComfort: data.localRetailerComfort || '',
    localRetailerComment: data.localRetailerComment || '',
    
    // Feature importance fields
    barcodeUseful: parseInt(data.barcodeUseful) || 0,
    alertsImportance: parseInt(data.alertsImportance) || 0,
    messagingValue: parseInt(data.messagingValue) || 0,
    reportsNecessity: parseInt(data.reportsNecessity) || 0,
    blockchainImportance: parseInt(data.blockchainImportance) || 0,
    
    // General feedback
    generalFeedback: data.generalFeedback || '',
  },
});
    return NextResponse.json(
      { success: true, reviewId: review.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reviews = await prisma.pharmareview.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
